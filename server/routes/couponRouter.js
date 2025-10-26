const express = require('express');
const router = express.Router();
const {
    createCoupon,
    validateCoupon,
    applyCoupon,
    getAllCoupons,
    getCouponsByUser,
    updateCoupon,
    deleteCoupon
} = require('../controllers/CouponControl');

// Public routes
router.post('/validate', validateCoupon);

// Apply coupon (when user enrolls)
router.post('/apply', applyCoupon);

// Get coupons by user email
router.get('/user/:email', getCouponsByUser);

// Admin routes (for creating/managing coupons)
router.post('/', createCoupon);
router.get('/', getAllCoupons);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;