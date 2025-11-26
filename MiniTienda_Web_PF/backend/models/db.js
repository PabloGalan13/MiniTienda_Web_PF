const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT, // <Aquí le decimos que use el 3307
        logging: false // Opcional: para que no llene la consola de texto SQL
    }
);

module.exports = sequelize;