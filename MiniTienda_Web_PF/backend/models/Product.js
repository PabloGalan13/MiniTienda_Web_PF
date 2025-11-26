const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Importamos la conexión a la BD 

// Definición del modelo "Product"
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'products', 
    timestamps: false      
});

module.exports = Product;