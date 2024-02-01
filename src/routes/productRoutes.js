// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct
} = require('../api/controllers/productController');

// Rutas para productos
router.get('/', getAllProducts);          // Obtener todos los productos
router.post('/', createProduct);           // Crear un nuevo producto
router.put('/:id', updateProduct);        // Actualizar un producto por ID
router.get('/:id', getProductById);       // Obtener un producto por ID
router.delete('/:id', deleteProduct);     // Eliminar un producto por ID

module.exports = router;
