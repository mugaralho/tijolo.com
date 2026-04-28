require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_SECRET_KEY devem estar definidas nas variáveis de ambiente.');
}

// Service Role Key: bypassa RLS e nunca é exposta ao cliente
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

console.log('Cliente Supabase inicializado.');

module.exports = supabase;
