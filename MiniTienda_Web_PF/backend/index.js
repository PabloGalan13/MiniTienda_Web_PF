const express = require('express');
const cors = require('cors');
require('dotenv').config();

// IMPORTACIONES DE BASE DE DATOS
const sequelize = require('./models/db'); // Traemos la conexión
const Product = require('./models/Product'); // Traemos el modelo para que Sequelize sepa que existe

// IMPORTACIÓN DE RUTAS
const productRoutes = require('./routes/products.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use(productRoutes);

// Manejo de errores básico
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message });
});

// force: false significa "si la tabla ya existe, no la borres"
sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Tablas sincronizadas correctamente');
        // Solo levantamos el servidor si la base de datos respondió bien
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error('X Error al sincronizar base de datos:', error);
    });