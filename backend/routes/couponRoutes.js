const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    createCoupon,
    getCoupons,
    deleteCoupon,
} = require('../controllers/couponController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getCoupons)
    .post(createCoupon);

router.route('/:couponId')
    .delete(deleteCoupon);

module.exports = router;
