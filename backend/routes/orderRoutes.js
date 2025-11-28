const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getOrders,
    getOrder,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getOrders);

router.route('/:orderId')
    .get(getOrder);

router.route('/:orderId/status')
    .put(updateOrderStatus);

module.exports = router;
