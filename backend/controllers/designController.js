const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get homepage config
// @route   GET /api/stores/:storeId/design/homepage
// @access  Private
const getHomepageConfig = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await prisma.store.findUnique({
            where: { id: storeId },
            select: { theme: true },
        });
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store.theme?.homepageConfig || {});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update homepage config
// @route   PUT /api/stores/:storeId/design/homepage
// @access  Private
const updateHomepageConfig = async (req, res) => {
    const { storeId } = req.params;
    const config = req.body;
    try {
        const currentStore = await prisma.store.findUnique({ where: { id: storeId }, select: { theme: true } });
        const store = await prisma.store.update({
            where: { id: storeId },
            data: { 
                theme: {
                    ...currentStore?.theme,
                    homepageConfig: config
                }
            },
        });
        res.json(store.theme?.homepageConfig);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get checkout config
// @route   GET /api/stores/:storeId/design/checkout
// @access  Private
const getCheckoutConfig = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await prisma.store.findUnique({
            where: { id: storeId },
            select: { theme: true },
        });
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store.theme?.checkoutConfig || {});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update checkout config
// @route   PUT /api/stores/:storeId/design/checkout
// @access  Private
const updateCheckoutConfig = async (req, res) => {
    const { storeId } = req.params;
    const config = req.body;
    try {
        const currentStore = await prisma.store.findUnique({ where: { id: storeId }, select: { theme: true } });
        const store = await prisma.store.update({
            where: { id: storeId },
            data: { 
                theme: {
                    ...currentStore?.theme,
                    checkoutConfig: config
                }
            },
        });
        res.json(store.theme?.checkoutConfig);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get order summary config
// @route   GET /api/stores/:storeId/design/order-summary
// @access  Private
const getOrderSummaryConfig = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await prisma.store.findUnique({
            where: { id: storeId },
            select: { theme: true },
        });
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store.theme?.orderSummaryConfig || {});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update order summary config
// @route   PUT /api/stores/:storeId/design/order-summary
// @access  Private
const updateOrderSummaryConfig = async (req, res) => {
    const { storeId } = req.params;
    const config = req.body;
    try {
        const currentStore = await prisma.store.findUnique({ where: { id: storeId }, select: { theme: true } });
        const store = await prisma.store.update({
            where: { id: storeId },
            data: { 
                theme: {
                    ...currentStore?.theme,
                    orderSummaryConfig: config
                }
            },
        });
        res.json(store.theme?.orderSummaryConfig);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get custom pages
// @route   GET /api/stores/:storeId/pages
// @access  Private
const getCustomPages = async (req, res) => {
    const { storeId } = req.params;
    try {
        // CustomPage model doesn't exist yet, return empty array
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create custom page
// @route   POST /api/stores/:storeId/pages
// @access  Private
const createCustomPage = async (req, res) => {
    const { storeId } = req.params;
    const { title, content } = req.body;
    try {
        // CustomPage model doesn't exist yet
        res.status(501).json({ message: 'Custom pages not yet implemented' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update custom page
// @route   PUT /api/stores/:storeId/pages/:pageId
// @access  Private
const updateCustomPage = async (req, res) => {
    const { pageId } = req.params;
    const { title, content } = req.body;
    try {
        // CustomPage model doesn't exist yet
        res.status(501).json({ message: 'Custom pages not yet implemented' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete custom page
// @route   DELETE /api/stores/:storeId/pages/:pageId
// @access  Private
const deleteCustomPage = async (req, res) => {
    const { storeId, pageId } = req.params;
    try {
        // CustomPage model doesn't exist yet
        res.status(501).json({ message: 'Custom pages not yet implemented' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
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
};
