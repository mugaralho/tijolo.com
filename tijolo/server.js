require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const { addToWaitlist, getWaitlistCount, getAdminWaitlist } = require('./controllers/waitlistController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = ['http://localhost:3000', 'https://tijolo.com', 'https://www.tijolo.com'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const helmet = require('helmet');
app.use(helmet());
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
