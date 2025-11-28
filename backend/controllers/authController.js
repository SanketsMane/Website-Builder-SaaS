const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/generateToken');
const { sendSms } = require('../utils/twilioService');

const prisma = new PrismaClient();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    let { name, email, password, mobile } = req.body;

    try {
        // Ensure mobile number has proper format for India (+91)
        if (mobile && !mobile.startsWith('+91')) {
            // Remove any existing country code or special characters
            mobile = mobile.replace(/[\s\-\(\)]/g, '').replace(/^\+?91/, '');
            // Add +91 prefix
            mobile = `+91${mobile}`;
        }

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (mobile) {
            const mobileExists = await prisma.user.findUnique({
                where: { mobile },
            });
            if (mobileExists) {
                return res.status(400).json({ message: 'Mobile number already used' });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                mobile,
            },
        });

        if (user) {
            // TODO: Send verification email
            console.log(`Verification email sent to ${user.email}`);

            const { accessToken, refreshToken } = generateTokens(user.id);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                verified: user.verified,
                token: accessToken,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { accessToken, refreshToken } = generateTokens(user.id);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                verified: user.verified,
                token: accessToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    plan: user.plan,
                    verified: user.verified
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    // Clear both possible cookie names for compatibility
    res.clearCookie('refreshToken');
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.cookies.jwt;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);

        // Set new refresh token cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ 
            token: accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                verified: user.verified,
                plan: user.plan
            }
        });
    } catch (error) {
        console.error('Refresh token error:', error.message);
        // Clear invalid refresh token
        res.clearCookie('refreshToken');
        res.clearCookie('jwt');
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// @desc    Verify email
// @route   POST /api/auth/verify-email
// @access  Private
const verifyEmail = async (req, res) => {
    // For now, just a mock endpoint
    // In real app, verify token from URL
    try {
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: { verified: true }
        });
        res.json({ message: 'Email verified', verified: user.verified });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// @desc    Reset password for testing
// @route   POST /api/auth/reset-password-dev
// @access  Public (only for development)
const resetPasswordDev = async (req, res) => {
    const { email, newPassword } = req.body;
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });
        
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Failed to reset password' });
    }
};

// @desc    Send OTP to mobile
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
    let { mobile } = req.body;
    
    try {
        // Ensure mobile number has proper format for India (+91)
        if (mobile && !mobile.startsWith('+91')) {
            // Remove any existing country code or special characters
            mobile = mobile.replace(/[\s\-\(\)]/g, '').replace(/^\+?91/, '');
            // Add +91 prefix
            mobile = `+91${mobile}`;
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        // Update or create user with OTP
        const user = await prisma.user.upsert({
            where: { mobile },
            update: { otp, otpExpires },
            create: {
                mobile,
                otp,
                otpExpires,
                name: 'User', // Default name
                email: `user_${Date.now()}@temp.com`, // Temporary email
                password: 'temp' // Temporary password
            }
        });
        
        // Send OTP via SMS (if Twilio is configured)
        try {
            await sendSms(mobile, `Your OTP is: ${otp}`);
            res.json({ message: 'OTP sent successfully' });
        } catch (smsError) {
            console.error('Error sending SMS:', smsError);
            console.log('SMS service not configured, OTP:', otp);
            res.json({ message: 'OTP generated (SMS service not configured)', otp: otp });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
    let { mobile, otp } = req.body;
    
    try {
        // Ensure mobile number has proper format for India (+91)
        if (mobile && !mobile.startsWith('+91')) {
            // Remove any existing country code or special characters
            mobile = mobile.replace(/[\s\-\(\)]/g, '').replace(/^\+?91/, '');
            // Add +91 prefix
            mobile = `+91${mobile}`;
        }
        
        const user = await prisma.user.findUnique({
            where: { mobile }
        });
        
        if (!user || !user.otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        
        // Clear OTP and mark mobile as verified
        await prisma.user.update({
            where: { mobile },
            data: { 
                otp: null, 
                otpExpires: null, 
                mobileVerified: true 
            }
        });
        
        const { accessToken, refreshToken } = generateTokens(user.id);
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        res.json({
            message: 'OTP verified successfully',
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                verified: user.verified,
                mobileVerified: true,
                plan: user.plan
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                mobile: true,
                verified: true,
                mobileVerified: true,
                plan: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    verifyEmail,
    sendOtp,
    verifyOtp,
    getMe,
    resetPasswordDev
};
