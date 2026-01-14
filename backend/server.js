const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // En producción, especificar el dominio del frontend
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Conectar BD solo si no es test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', require('./src/routes/authRoutes'));

// Inyectar io en req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
// app.get('/', (req, res) => {
//   res.send('API del Sistema de Gestión de Restaurante funcionando');
// });

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Serve static files (React Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Handle React Routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server only if not in test mode
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;
