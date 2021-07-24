const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/AuthController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const uploadController = require('../controllers/uploadController');
const faqController = require('../controllers/faqController');
const Controller404 = require('../controllers/404Controller')
const cartController = require('../controllers/cartController')
const checkoutController = require('../controllers/checkoutController')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', authController.authenticate);
router.get('/redirect',authController.redirect);
router.get('/home',authController.checkAuth, authController.home);
router.get('/addProductPage', authController.checkAuth, productController.addProductPage);
router.post('/addProduct', uploadController.uploadFile, productController.addProduct);
router.get('/shopBottles',productController.viewBottles)
router.get('/shopBackpacks',productController.viewBackpacks)
router.get('/shopShirts',productController.viewShirts)
router.get('/shopAllProducts',productController.viewAllProducts)

router.get('/viewSettings',productController.viewSettings)
router.get('/faq',faqController.viewFAQ)
router.get('/after_add/:product_id/:sku_id',cartController.viewSubPage)
router.get('/shopCart/:order_id',cartController.viewCart)
router.get('/checkoutPage/:order_id',checkoutController.viewCheckout)
router.get('/*',Controller404.notFound)

module.exports = router;

