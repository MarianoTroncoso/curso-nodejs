const express = require('express');
const productsController = require('../../controllers/v1/products-controller');

// con el router creamos las rutas
const router = express.Router();

router.post('/create', productsController.createProduct);
router.get('/get-all', productsController.getsProducts);

module.exports = router;
