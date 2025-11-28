const express = require('express');
const router = express.Router({ mergeParams: true });
const { getDashboardStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getDashboardStats);

module.exports = router;
