```javascript
const express = require('express');
const router = express.Router();
const {
  getStores,
  createStore,
  getTemplates,
  updateStore,
} = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getStores).post(protect, createStore);
router.get('/templates', protect, getTemplates);
router.route('/:id').put(protect, updateStore);

module.exports = router;
```
