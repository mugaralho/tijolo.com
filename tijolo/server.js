require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const { addToWaitlist, getWaitlistCount, getAdminWaitlist } = require('./controllers/waitlistController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = ['http://localhost:3000', 'https://tijolo.app.br', 'https://www.tijolo.app.br'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

// Rate Limiting: 100 requests per 15 minutes for APIs
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Muitas solicitações deste IP, tente novamente mais tarde.' }
});

app.use('/api/', apiLimiter);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints
app.get('/api/waitlist/count', getWaitlistCount);
app.post('/api/waitlist', addToWaitlist);
app.post('/api/admin/waitlist', getAdminWaitlist); // Switched to POST for security

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.' 
  });
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
