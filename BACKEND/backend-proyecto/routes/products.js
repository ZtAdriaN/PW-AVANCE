const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// REQUERIMIENTO 15
// Listar todos los regalos/productos
router.get('/', async (req, res) => {
	try {
		const products = await Product.findAll({
			attributes: ['id', 'name', 'price', 'points', 'type']
		});
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});


module.exports = router;