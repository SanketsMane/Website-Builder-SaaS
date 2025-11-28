const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');
const publicStoreRoutes = require('./routes/publicStoreRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const designRoutes = require('./routes/designRoutes');
const sheetRoutes = require('./routes/sheetRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Middleware
// Webhook route needs raw body, so we mount it before express.json()
// app.use('/api/subscriptions/webhook', express.raw({ type: 'application/json' }), subscriptionRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: (origin, callback) => {
        // Allow all origins for now to support subdomains
        // In production, you'd want to be more specific or check against allowed domains
        callback(null, true);
    },
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/public', publicStoreRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/stores/:storeId/design', designRoutes);
app.use('/api/stores/:storeId/sheets', sheetRoutes);
app.use('/api/stores/:storeId/orders', orderRoutes);
app.use('/api/stores/:storeId/coupons', couponRoutes);
app.use('/api/stores/:storeId/analytics', analyticsRoutes);
app.use('/api/stores/:storeId/products', productRoutes);


// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
