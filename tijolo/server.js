require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const { addToWaitlist, getWaitlistCount, getAdminWaitlist } = require('./controllers/waitlistController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints
app.get('/api/waitlist/count', getWaitlistCount);
app.post('/api/waitlist', addToWaitlist);
app.get('/api/admin/waitlist', (req, res) => {
  const password = req.query.password;
  const MASTER_PASSWORD = process.env.ADMIN_PASSWORD;

  // Log para você conferir no terminal se a senha está chegando (opcional)
  console.log(`Tentativa de acesso com a senha: ${password}`);

  if (!password || password !== MASTER_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Acesso negado.' });
  }

  const { db } = require('./controllers/waitlistController');
  db.all("SELECT id, email, created_at FROM waitlist ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: rows });
  });
});


// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
