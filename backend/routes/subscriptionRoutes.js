const express = require('express');
const router = express.Router();
const {
    createCheckoutSession,
    createPortalSession,
    handleWebhook,
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/create-portal-session', protect, createPortalSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
