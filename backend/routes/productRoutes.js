const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.route('/')
    .post(protect, upload.single('image'), createProduct)
    .get(protect, getProducts);

router.route('/:id')
    .get(protect, getProduct)
    .put(protect, upload.single('image'), updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;
