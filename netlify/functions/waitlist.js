const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

// Clientes inicializados fora do handler para reutilização entre invocações
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://tijolo.app.br',
  'https://www.tijolo.app.br',
  'http://localhost:3000',
];

const getCorsHeaders = (origin) => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

exports.handler = async (event) => {
  const origin = event.headers?.origin || '';
  const headers = getCorsHeaders(origin);

  // Preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // GET /api/waitlist → retorna contagem
  if (event.httpMethod === 'GET') {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase count error:', error);
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: 'Erro ao buscar contagem.' }) };
    }

    const baseCount = 8;
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, count: baseCount + count }) };
  }

  // POST /api/waitlist → cadastro na lista de espera
  if (event.httpMethod === 'POST') {
    let email, name;
    try {
      const body = JSON.parse(event.body);
      email = body.email;
      name = body.name || 'Arquiteto';
    } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Dados inválidos.' }) };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email?.trim().toLowerCase();
    const cleanName = name?.trim();

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'E-mail inválido.' }) };
    }

    // Insere no Supabase
    const { error } = await supabase
      .from('waitlist')
      .insert({ name: cleanName, email: cleanEmail });

    if (error) {
      // 23505 = unique_violation no PostgreSQL
      if (error.code === '23505') {
        return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: 'Email já registrado.' }) };
      }
      console.error('Supabase insert error:', error);
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: 'Erro ao salvar.' }) };
    }

    console.log(`Novo cadastro: ${cleanEmail}`);

    // Envia e-mails (falha silenciosa)
    try {
      await Promise.all([
        // Confirmação para o usuário
        resend.emails.send({
          from: 'tijolo <contato@mail.tijolo.app.br>',
          to: cleanEmail,
          subject: 'Solicitação de Acesso | Tijolo',
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 60px 20px; color: #000000; line-height: 1.6;">
              <div style="max-width: 500px; margin: 0 auto; border: 1px solid #f0f0f0; padding: 40px; border-radius: 4px;">
                <h1 style="font-size: 22px; font-weight: 500; letter-spacing: -0.5px; margin-bottom: 30px; border-bottom: 1px solid #000; display: inline-block; padding-bottom: 5px;">
                  tijolo.
                </h1>
                <p style="font-size: 16px; margin-bottom: 20px;">Olá,</p>
                <p style="font-size: 15px; color: #333; margin-bottom: 25px;">
                  Sua solicitação para a lista de espera foi registrada com sucesso. Estamos construindo uma forma mais inteligente e rastreável de gerenciar seus projetos de arquitetura.
                </p>
                <div style="background-color: #fafafa; border-radius: 2px; padding: 20px; margin-bottom: 25px; border-left: 2px solid #000;">
                  <p style="font-size: 13px; margin: 0; color: #666; text-transform: uppercase; letter-spacing: 1px;">Status da Solicitação</p>
                  <p style="font-size: 16px; margin: 5px 0 0 0; font-weight: 500;">Aguardando Aprovação</p>
                </div>
                <p style="font-size: 14px; color: #888;">
                  Você será notificado assim que sua conta estiver pronta para o primeiro acesso.
                </p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;">
                <p style="font-size: 12px; color: #aaa; text-align: center;">
                  © 2026 Tijolo — Rastreabilidade na ponta dos dedos.<br>
                  São Paulo, Brasil.
                </p>
              </div>
            </div>
          `,
        }),
        // Notificação interna
        resend.emails.send({
          from: 'tijolo <contato@mail.tijolo.app.br>',
          to: 'contato@mail.tijolo.app.br',
          subject: `Nova entrada na waitlist: ${cleanEmail}`,
          html: `<p style="font-family:Arial;font-size:15px;">Novo cadastro na waitlist do tijolo:<br><strong>${cleanEmail}</strong></p>`,
        }),
      ]);
    } catch (emailErr) {
      console.error('Erro no envio de e-mail:', emailErr);
      // Não falha a requisição — dado já foi salvo
    }

    return { statusCode: 201, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
