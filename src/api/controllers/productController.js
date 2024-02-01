const db = require('../../config/db');

const getAllProducts = async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        db.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { codigo_barra, nombre, valor } = req.body;
        const query = 'INSERT INTO products (codigo_barra, nombre, valor) VALUES (?, ?, ?)';
        const values = [codigo_barra, nombre, valor];
        db.query(query, values, (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).json({ message: 'Inserción exitosa' });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { codigo_barra, nombre, valor } = req.body;
        const query = 'UPDATE products SET codigo_barra = ?, nombre = ?, valor = ? WHERE id = ?';
        const values = [codigo_barra, nombre, valor, productId];
        db.query(query, values, (error, results) => {
            if (error) {
                throw error;
            }
            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Actualización exitosa' });
            } else {
                throw new Error('Product not found');
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const query = 'SELECT * FROM products WHERE id = ?';
        const values = [productId];
        db.query(query, values, (error, results) => {
            if (error) {
                throw error;
            }
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                throw new Error('Product not found');
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const query = 'DELETE FROM products WHERE id = ?';
        const values = [productId];
        db.query(query, values, (error, results) => {
            if (error) {
                throw error;
            }
            if (results.affectedRows > 0) {
                res.status(204).json({ message: 'Eliminación exitosa' });
            } else {
                throw new Error('Product not found');
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct
};
