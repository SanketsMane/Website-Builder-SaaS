const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create new order (Public)
// @route   POST /api/public/stores/:subdomain/orders
// @access  Public
const createOrder = async (req, res) => {
    const { subdomain } = req.params;
    const { items, customer, shippingMethod, total } = req.body;

    try {
        const store = await prisma.store.findUnique({
            where: { subdomain },
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // In a real app, verify stock and recalculate total here for security

        const order = await prisma.order.create({
            data: {
                storeId: store.id,
                customerName: customer.name,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                shippingAddress: customer.address,
                shippingMethod: shippingMethod.label,
                shippingCost: shippingMethod.fee,
                total: total,
                status: 'PENDING',
                items: {
                    create: items.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        // Optional: Decrement stock here

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating order' });
    }
};

// @desc    Get all orders for a store (Dashboard)
// @route   GET /api/stores/:storeId/orders
// @access  Private
const getOrders = async (req, res) => {
    const { storeId } = req.params;
    try {
        // Order model doesn't exist yet, return empty array
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching orders' });
    }
};

// @desc    Get single order (Dashboard)
// @route   GET /api/stores/:storeId/orders/:orderId
// @access  Private
const getOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching order' });
    }
};

// @desc    Update order status (Dashboard)
// @route   PUT /api/stores/:storeId/orders/:orderId/status
// @access  Private
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error updating order' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
};
