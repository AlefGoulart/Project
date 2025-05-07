const express = require('express');
const router = express.Router();
const FavoriteProductController = require('../controllers/FavoriteProductController');

//middlewares
const verifyToken = require('../helpers/verify-token')

router.get('/products', FavoriteProductController.listProducts);
router.post('/add', verifyToken, FavoriteProductController.addProductToList);
router.delete('/remove/:id', verifyToken, FavoriteProductController.removeProductFromList);

module.exports = router;