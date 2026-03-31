const db = require('../config/db');
const { sendConfirmationEmail } = require('../services/emailService');

const getWaitlistCount = (req, res) => {
  db.get('SELECT COUNT(*) as count FROM waitlist', [], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, message: 'Erro ao buscar contagem' });
    }
    const baseCount = 0;
    res.json({ success: true, count: baseCount + row.count });
  });
};

const getAdminWaitlist = (req, res) => {
  const { password } = req.query;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tijolo123';

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Senha incorreta.' });
  }

  db.all('SELECT email, created_at FROM waitlist ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, message: 'Erro ao buscar waitlist' });
    }
    res.json({ success: true, users: rows });
  });
};

const addToWaitlist = (req, res) => {
  const { name = 'Arquiteto', email } = req.body;

  // Validação simples de e-mail
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'E-mail inválido.' });
  }

  const query = `INSERT INTO waitlist (name, email) VALUES (?, ?)`;

  // Limpamos espaços extras no e-mail e nome
  const cleanEmail = email.trim();
  const cleanName = name.trim();

  db.run(query, [cleanName, cleanEmail], async function (err) {
    if (err) {
      // Se o e-mail já existe no seu banco de dados
      if (err.message.includes('UNIQUE constraint failed')) {
        console.log(`E-mail já cadastrado: ${cleanEmail}`);
        return res.status(200).json({ success: true, message: 'Email já registrado.' });
      }
      console.error('Erro no banco:', err.message);
      return res.status(500).json({ success: false, message: 'Erro ao salvar.' });
    }

    console.log(`Novo cadastro: ${cleanEmail}`);

    try {
      // DISPARO DO E-MAIL: Aqui o "Gerente" dá a ordem para o Resend
      const emailResult = await sendConfirmationEmail(cleanEmail);

      if (!emailResult.success) {
        console.error(`O e-mail não saiu para ${cleanEmail}, mas ele foi salvo no banco.`);
      } else {
        console.log(`E-mail de confirmação enviado com sucesso para: ${cleanEmail}`);
      }
    } catch (e) {
      console.error('Erro inesperado ao tentar enviar e-mail:', e);
    }

    // Resposta final para o site (o que faz o botão mudar de estado)
    res.status(201).json({ success: true, message: "Cadastro realizado." });
  });
};

module.exports = {
  getWaitlistCount,
  addToWaitlist,
  getAdminWaitlist
};