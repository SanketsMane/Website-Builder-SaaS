const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get store by subdomain (username)
// @route   GET /api/public/stores/:subdomain
// @access  Public
const getStoreBySubdomain = async (req, res) => {
    const { subdomain } = req.params;

    try {
        console.log('Looking for store with username:', subdomain);
        const store = await prisma.store.findUnique({
            where: { username: subdomain },
            select: {
                id: true,
                name: true,
                username: true,
                logo: true,
                banner: true,
                theme: true,
                owner: {
                    select: {
                        email: true, // Maybe useful for contact form later
                    },
                },
            },
        });

        if (!store) {
            console.log('Store not found for subdomain:', subdomain);
            return res.status(404).json({ message: 'Store not found' });
        }
        
        console.log('Found store:', store.name, 'with username:', store.username);
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get products for a specific store
// @route   GET /api/public/stores/:subdomain/products
// @access  Public
const getStoreProducts = async (req, res) => {
    const { subdomain } = req.params;

    try {
        const store = await prisma.store.findUnique({
            where: { username: subdomain },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const products = await prisma.product.findMany({
            where: { storeId: store.id },
            orderBy: { createdAt: 'desc' },
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single product details
// @route   GET /api/public/stores/:subdomain/products/:productId
// @access  Public
const getStoreProduct = async (req, res) => {
    const { subdomain, productId } = req.params;

    try {
        const store = await prisma.store.findUnique({
            where: { username: subdomain },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                storeId: store.id
            },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getPublicStore: getStoreBySubdomain,
    getPublicProducts: getStoreProducts,
    getPublicProduct: getStoreProduct
};
