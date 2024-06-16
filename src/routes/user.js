const express = require('express');
const router = express.Router();

const {register, login, vendors, profile, profileUpdate, passwordUpdate, verifyOTP, sendOTP, resetPassword, address,
    getSingleVendor, vendorUpdate
} = require('../controllers/userController');
const {AuthVerifyMiddleware, isSuperAdmin} = require("../middleware/AuthVerifyMiddleware");


router.post('/register', AuthVerifyMiddleware, isSuperAdmin, register);
router.get('/vendors', AuthVerifyMiddleware, isSuperAdmin, vendors);
router.get('/vendor/:id', AuthVerifyMiddleware, isSuperAdmin, getSingleVendor);
router.put('/vendor/:id', AuthVerifyMiddleware, isSuperAdmin, vendorUpdate);

router.post('/login', login);
router.get('/users/:email/:otp', verifyOTP);
router.get('/users/:email', sendOTP);
router.patch('/users/:email/:otp', resetPassword);

router.get('/users', AuthVerifyMiddleware, profile);
router.get('/address', AuthVerifyMiddleware, address);
router.patch('/users/p', AuthVerifyMiddleware, profileUpdate);
router.patch('/users', AuthVerifyMiddleware, passwordUpdate);

// Auth check route
router.get('/auth-check', AuthVerifyMiddleware, (req, res)=>{
    res.status(200).json({ok: true});
});

// super admin check route
router.get('/superadmin-check', AuthVerifyMiddleware, isSuperAdmin, (req, res)=>{
    res.status(200).json({ok: true});
});


module.exports = router;