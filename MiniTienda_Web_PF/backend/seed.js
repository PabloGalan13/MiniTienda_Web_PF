// backend/seed.js
const sequelize = require('./models/db');
const Product = require('./models/Product');

const products = [
    {
        name: "Laptop Gamer X1",
        price: 15000.00,
        stock: 10,
        description: "Potente laptop para juegos con tarjeta gráfica de última generación y pantalla 144Hz."
    },
    {
        name: "Auriculares Bluetooth Pro",
        price: 850.50,
        stock: 25,
        description: "Cancelación de ruido activa y hasta 20 horas de batería."
    },
    {
        name: "Smartphone Z-Fold",
        price: 22000.00,
        stock: 5,
        description: "Teléfono plegable con pantalla AMOLED y cámara de 108MP."
    },
    {
        name: "Teclado Mecánico RGB",
        price: 1200.00,
        stock: 15,
        description: "Switches azules clicky, ideal para escribir y programar."
    },
    {
        name: "Monitor 4K Ultra",
        price: 6500.00,
        stock: 8,
        description: "Monitor de 27 pulgadas con colores calibrados para diseño gráfico."
    },
    {
        name: "Mouse Ergonómico Vertical",
        price: 450.00,
        stock: 30,
        description: "Reduce la fatiga en la muñeca, conexión inalámbrica."
    }
];

const seedDB = async () => {
    try {

        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');

        await Product.sync({ force: true });
        console.log('Tabla de productos reiniciada.');

        await Product.bulkCreate(products);
        console.log('Productos insertados correctamente.');

    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        await sequelize.close();
        console.log('Conexión cerrada.');
    }
};

seedDB();