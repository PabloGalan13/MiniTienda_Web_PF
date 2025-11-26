// backend/routes/products.routes.js
const { Router } = require('express');
const router = Router();
const Product = require('../models/Product'); // Importamos el modelo 

// 1. OBTENER TODOS LOS PRODUCTOS
router.get('/api/products', async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        next(error); // Enviamos el error al middleware de errores
    }
});

// 2. OBTENER UN PRODUCTO POR ID
router.get('/api/products/:id', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// 3. CREAR UN NUEVO PRODUCTO
router.post('/api/products', async (req, res, next) => {
    try {
        // Extraemos los datos del cuerpo de la petición
        const { name, price, stock, description } = req.body;
        
        const newProduct = await Product.create({
            name,
            price,
            stock,
            description
        });
        
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

// 4. ACTUALIZAR UN PRODUCTO
router.put('/api/products/:id', async (req, res, next) => {
    try {
        const { name, price, stock, description } = req.body;
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizamos
        await product.update({ name, price, stock, description });
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// 5. ELIMINAR UN PRODUCTO
router.delete('/api/products/:id', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await product.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 