const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products.routes'); // [cite: 131]
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares [cite: 102]
app.use(cors());
app.use(express.json());

// Rutas
app.use(productRoutes); // [cite: 132]

// Middleware de manejo de errores (Backend) [cite: 137]
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});