const { PrismaClient } = require('@prisma/client');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');
const prisma = new PrismaClient();

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    const { title, description, price } = req.body;
    const userId = req.user.id;

    try {
        const store = await prisma.store.findUnique({
            where: { ownerId: userId },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        let imageUrl = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const product = await prisma.product.create({
            data: {
                storeId: store.id,
                title,
                description,
                price: parseFloat(price),
                image: imageUrl,
            },
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all products for current user's store
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    const { storeId } = req.params;
    const userId = req.user.id;

    try {
        // Verify user owns this store
        const store = await prisma.store.findFirst({
            where: { 
                id: storeId,
                ownerId: userId 
            },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const products = await prisma.product.findMany({
            where: { storeId },
            orderBy: { createdAt: 'desc' },
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const store = await prisma.store.findUnique({
            where: { ownerId: userId },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const product = await prisma.product.findFirst({
            where: { id, storeId: store.id },
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

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const userId = req.user.id;

    try {
        const store = await prisma.store.findUnique({
            where: { ownerId: userId },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const product = await prisma.product.findFirst({
            where: { id, storeId: store.id },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let imageUrl = product.image;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title: title || product.title,
                description: description || product.description,
                price: price ? parseFloat(price) : product.price,
                image: imageUrl,
            },
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const store = await prisma.store.findUnique({
            where: { ownerId: userId },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const product = await prisma.product.findFirst({
            where: { id, storeId: store.id },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await prisma.product.delete({
            where: { id },
        });

        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
