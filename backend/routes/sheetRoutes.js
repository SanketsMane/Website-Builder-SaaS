const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    connectSheet,
    syncProducts,
    disconnectSheet,
    testConnection,
    getSetupGuide
} = require('../controllers/sheetController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/setup-guide', getSetupGuide);
router.post('/test', testConnection);
router.post('/connect', connectSheet);
router.post('/sync', syncProducts);
router.delete('/disconnect', disconnectSheet);

module.exports = router;
