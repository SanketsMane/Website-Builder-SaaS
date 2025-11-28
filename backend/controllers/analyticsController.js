const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get dashboard stats
// @route   GET /api/stores/:storeId/analytics
// @access  Private
const getDashboardStats = async (req, res) => {
    const { storeId } = req.params;

    try {
        // Since Order model doesn't exist yet, return mock data
        const totalOrders = 0;
        const totalRevenue = 0;
        const totalProducts = await prisma.product.count({
            where: { storeId },
        });

        res.json({
            totalOrders,
            totalRevenue,
            totalProducts,
            recentOrders: [],
            topProducts: [],
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Server error fetching analytics' });
    }
};

module.exports = {
    getDashboardStats,
};
