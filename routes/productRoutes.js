const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getByID);
router.get('/productsbyprice/:n', productController.getByPrice);
router.post('/products', productController.addProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)

module.exports = router;