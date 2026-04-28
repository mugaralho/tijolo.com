const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const ALLOWED_ORIGINS = [
  'https://tijolo.app.br',
  'https://www.tijolo.app.br',
  'http://localhost:3000',
];

const getCorsHeaders = (origin) => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

exports.handler = async (event) => {
  const origin = event.headers?.origin || '';
  const headers = getCorsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let password;
  try {
    const body = JSON.parse(event.body);
    password = body.password;
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Dados inválidos.' }) };
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD || !password || password !== ADMIN_PASSWORD) {
    // Resposta genérica para não revelar se a senha existe
    return { statusCode: 401, headers, body: JSON.stringify({ success: false, message: 'Acesso negado.' }) };
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('email, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase admin list error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: 'Erro ao buscar waitlist.' }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ success: true, users: data }) };
};
