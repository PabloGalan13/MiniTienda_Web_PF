const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la conexión usando variables de entorno [cite: 79-84]
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;