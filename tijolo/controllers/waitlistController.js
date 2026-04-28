const supabase = require('../config/db');
const { sendConfirmationEmail } = require('../services/emailService');

const getWaitlistCount = async (req, res) => {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Supabase count error:', error.message);
    return res.status(500).json({ success: false, message: 'Erro ao buscar contagem' });
  }

  const baseCount = 8; // Contagem base conforme solicitado
  res.json({ success: true, count: baseCount + count });
};

const getAdminWaitlist = async (req, res) => {
  const password = req.body.password || req.query.password;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tijolo123';

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Acesso negado. Senha incorreta.' });
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('email, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase list error:', error.message);
    return res.status(500).json({ success: false, message: 'Erro ao buscar waitlist' });
  }

  res.json({ success: true, users: data });
};

const addToWaitlist = async (req, res) => {
  const { name = 'Arquiteto', email } = req.body;

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Por favor, insira um e-mail válido.' });
  }

  // Normaliza: lowercase + trim evita duplicatas por capitalização
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  const { error } = await supabase
    .from('waitlist')
    .insert({ name: cleanName, email: cleanEmail });

  if (error) {
    // Código 23505 = violação de UNIQUE constraint no PostgreSQL
    if (error.code === '23505') {
      console.log(`E-mail já cadastrado: ${cleanEmail}`);
      return res.status(200).json({ success: true, message: 'Email já registrado.' });
    }
    console.error('Supabase insert error:', error.message);
    return res.status(500).json({ success: false, message: 'Erro ao salvar.' });
  }

  console.log(`Novo cadastro: ${cleanEmail}`);

  // Envia e-mail de confirmação (falha silenciosa — dado já está salvo)
  try {
    const emailResult = await sendConfirmationEmail(cleanEmail);
    if (!emailResult.success) {
      console.error(`E-mail não enviado para ${cleanEmail}, mas cadastro foi salvo.`);
    } else {
      console.log(`E-mail de confirmação enviado para: ${cleanEmail}`);
    }
  } catch (e) {
    console.error('Erro inesperado ao enviar e-mail:', e);
  }

  res.status(201).json({ success: true, message: 'Cadastro realizado.' });
};

module.exports = {
  getWaitlistCount,
  addToWaitlist,
  getAdminWaitlist,
};