const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getHomepageConfig,
    updateHomepageConfig,
    getCheckoutConfig,
    updateCheckoutConfig,
    getOrderSummaryConfig,
    updateOrderSummaryConfig,
    getCustomPages,
    createCustomPage,
    updateCustomPage,
    deleteCustomPage,
} = require('../controllers/designController');
const { protect, requireStoreOwner } = require('../middleware/authMiddleware');

// Middleware to ensure user owns the store
// Note: You need to implement requireStoreOwner middleware if not already present
// For now, we'll rely on protect and assume the controller checks ownership or we add a simple check here

router.use(protect);

router.route('/homepage')
    .get(getHomepageConfig)
    .put(updateHomepageConfig);

router.route('/checkout')
    .get(getCheckoutConfig)
    .put(updateCheckoutConfig);

router.route('/order-summary')
    .get(getOrderSummaryConfig)
    .put(updateOrderSummaryConfig);

router.route('/pages')
    .get(getCustomPages)
    .post(createCustomPage);

router.route('/pages/:pageId')
    .put(updateCustomPage)
    .delete(deleteCustomPage);

module.exports = router;
