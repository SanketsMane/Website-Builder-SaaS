const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create new coupon
// @route   POST /api/stores/:storeId/coupons
// @access  Private
const createCoupon = async (req, res) => {
    const { storeId } = req.params;
    const { code, type, value, minAmount, maxUses, validFrom, validTo } = req.body;

    try {
        // Coupon model doesn't exist yet, return mock response
        res.status(501).json({ message: 'Coupon functionality not yet implemented' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating coupon' });
    }
};

// @desc    Get all coupons for a store
// @route   GET /api/stores/:storeId/coupons
// @access  Private
const getCoupons = async (req, res) => {
    const { storeId } = req.params;
    try {
        // Coupon model doesn't exist yet, return empty array
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching coupons' });
    }
};

// @desc    Delete coupon
// @route   DELETE /api/stores/:storeId/coupons/:couponId
// @access  Private
const deleteCoupon = async (req, res) => {
    const { couponId } = req.params;
    try {
        // Coupon model doesn't exist yet
        res.status(501).json({ message: 'Coupon functionality not yet implemented' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting coupon' });
    }
};

// @desc    Validate coupon (Public)
// @route   POST /api/public/:subdomain/coupons/validate
// @access  Public
const validateCoupon = async (req, res) => {
    const { subdomain } = req.params;
    const { code, cartTotal } = req.body;

    try {
        const store = await prisma.store.findUnique({
            where: { subdomain },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // Coupon model doesn't exist yet, return invalid coupon
        return res.status(404).json({ message: 'Invalid coupon code' });

        // Checks
        const now = new Date();
        if (coupon.validFrom && now < coupon.validFrom) {
            return res.status(400).json({ message: 'Coupon is not yet active' });
        }
        if (coupon.validTo && now > coupon.validTo) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
            return res.status(400).json({ message: 'Coupon usage limit reached' });
        }
        if (coupon.minAmount && cartTotal < coupon.minAmount) {
            return res.status(400).json({ message: `Minimum order amount is ${coupon.minAmount}` });
        }

        // Calculate discount
        let discountAmount = 0;
        if (coupon.type === 'PERCENTAGE') {
            discountAmount = (cartTotal * coupon.value) / 100;
        } else {
            discountAmount = coupon.value;
        }

        // Ensure discount doesn't exceed total
        discountAmount = Math.min(discountAmount, cartTotal);

        res.json({
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            discountAmount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error validating coupon' });
    }
};

module.exports = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    validateCoupon,
};
