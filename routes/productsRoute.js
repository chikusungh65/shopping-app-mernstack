const express = require('express');
const {getProduct,getProducts} = require ('../controllers/productsController');
const router = express.Router();
//get route for all product

router.route('/products').get(getProducts)

//get route for single product

router.route('/products/:id').get(getProduct);


module.exports = router;