const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { isAuth } = require('../middleware/auth');

router.get('/getCarts', cartController.getAllCarts)
router.post('/getCart', isAuth, cartController.getCart)
router.post('/createcart', cartController.addCart)
router.post('/updatequantity', cartController.updateQuantity)
router.post('/addtocart', isAuth, cartController.addToCart)
router.post('/removefromcart', isAuth, cartController.removeFromCart)
router.put('/placecart', isAuth, cartController.placeCart)

module.exports = router;