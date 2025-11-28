const express = require('express');
const router = express.Router();
const { getPublicStore, getPublicProducts, getPublicProduct } = require('../controllers/publicStoreController');
const { createOrder } = require('../controllers/orderController');
const { validateCoupon } = require('../controllers/couponController');

router.get('/:subdomain', getPublicStore);
router.get('/:subdomain/products', getPublicProducts);
router.get('/:subdomain/products/:slug', getPublicProduct);
router.post('/:subdomain/orders', createOrder);
router.post('/:subdomain/coupons/validate', validateCoupon);

module.exports = router;
