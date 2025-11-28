const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    verifyEmail,
    sendOtp,
    verifyOtp,
    getMe,
    resetPasswordDev,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);
router.post('/verify-email', verifyEmail);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password-dev', resetPasswordDev);

module.exports = router;
