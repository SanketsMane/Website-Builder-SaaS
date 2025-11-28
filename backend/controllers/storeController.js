const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all stores for the current user
// @route   GET /api/stores
// @access  Private
const getStores = async (req, res) => {
    try {
        const stores = await prisma.store.findMany({
            where: { ownerId: req.user.id },
            select: {
                id: true,
                name: true,
                username: true,
                logo: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        res.json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching stores' });
    }
};

// @desc    Create a new store
// @route   POST /api/stores
// @access  Private
const createStore = async (req, res) => {
    const { name, currency, template, receiveWhatsApp, receiveEmail, receiveSheet, whatsappNumber, orderEmail } = req.body;

    try {
        // Generate a random slug
        const randomSlug = `store${Math.floor(10000 + Math.random() * 90000)}`;

        // Check if user already has a store (limit based on plan)
        const userStores = await prisma.store.count({
            where: { ownerId: req.user.id },
        });

        if (req.user.plan === 'FREE' && userStores >= 1) {
            return res.status(403).json({ message: 'Free plan limit reached. Upgrade to create more stores.' });
        }

        const store = await prisma.store.create({
            data: {
                ownerId: req.user.id,
                name,
                username: randomSlug,
                theme: {
                    currency: currency || 'USD',
                    template: template || 'MULTI_PURPOSE',
                    receiveWhatsApp: receiveWhatsApp || false,
                    receiveEmail: receiveEmail || true,
                    receiveSheet: receiveSheet || false,
                    whatsappNumber,
                    orderEmail,
                    homepageConfig: {
                        sections: [
                            { type: 'header', visible: true },
                            { type: 'banner', visible: true, title: 'Welcome', subtitle: 'Best products' },
                            { type: 'products', visible: true, title: 'Featured Products' },
                            { type: 'footer', visible: true },
                        ],
                    },
                },
            },
        });

        res.status(201).json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating store' });
    }
};

// @desc    Get store templates
// @route   GET /api/stores/templates
// @access  Private
const getTemplates = async (req, res) => {
    const templates = [
        { id: 'MULTI_PURPOSE', name: 'Multi-purpose', description: 'Great for any kind of store' },
        { id: 'QUICK_ORDER', name: 'Quick Order', description: 'Optimized for fast checkout' },
        { id: 'WHOLESALE', name: 'Wholesale', description: 'Best for bulk orders' },
        { id: 'DIGITAL_DOWNLOAD', name: 'Digital Download', description: 'Sell files and digital goods' },
        { id: 'SERVICE_BOOKING', name: 'Service Booking', description: 'For appointments and services' },
        { id: 'LINK_LIST', name: 'Link List', description: 'Simple list of links' },
        { id: 'BLANK', name: 'Start from scratch', description: 'Build your own layout' },
    ];
    res.json(templates);
};

// @desc    Update store details
// @route   PUT /api/stores/:id
// @access  Private
const updateStore = async (req, res) => {
    const { id } = req.params;
    const { name, username, currency } = req.body;

    try {
        const store = await prisma.store.findUnique({
            where: { id },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        if (store.ownerId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Check if username is taken if changing
        if (username && username !== store.username) {
            const existing = await prisma.store.findUnique({
                where: { username },
            });
            if (existing) {
                return res.status(400).json({ message: 'Username already taken' });
            }
        }

        const updatedStore = await prisma.store.update({
            where: { id },
            data: {
                name: name || store.name,
                username: username || store.username,
                // Store other config in theme JSON field
                theme: {
                    ...(store.theme || {}),
                    currency: currency || (store.theme?.currency),
                },
            },
        });

        res.json(updatedStore);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating store' });
    }
};

module.exports = {
    getStores,
    createStore,
    getTemplates,
    updateStore,
};
