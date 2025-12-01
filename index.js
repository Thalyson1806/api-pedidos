const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const orderRoutes = require('./src/routes/orderRoutes');

const app = express();

//Middleware para ler o json
app.use(express.json());

// ROtas
app.use(orderRoutes);

// Conex~]ao com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((error) => console.log('Erro ao conectar no MongoDB:', error));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
