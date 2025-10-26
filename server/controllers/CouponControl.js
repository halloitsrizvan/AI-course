const Coupon = require('../models/couponModel');
const mongoose = require('mongoose');

// Create a new coupon (for admin when user pays via WhatsApp)
const createCoupon = async (req, res) => {
    try {
        const { nameOfUser, userEmail, code, courseId, courseName, expiresInDays = 7 } = req.body;

        // Calculate expiration date
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);

        const coupon = await Coupon.create({
            nameOfUser,
            userEmail,
            code: code.toUpperCase(),
            courseId,
            courseName,
            expiresAt,
            isActive: true,
            used: false
        });

        res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            coupon: {
                id: coupon._id,
                code: coupon.code,
                nameOfUser: coupon.nameOfUser,
                courseName: coupon.courseName,
                expiresAt: coupon.expiresAt
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code already exists'
            });
        }
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Validate coupon (when user applies code)
const validateCoupon = async (req, res) => {
    try {
        const { code, userEmail } = req.body;

        if (!code || !userEmail) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code and user email are required'
            });
        }

        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase().trim(),
            userEmail: userEmail.toLowerCase().trim()
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Invalid coupon code or email mismatch'
            });
        }

        // Check if coupon is valid
        const validation = coupon.isValid();
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        res.json({
            success: true,
            message: 'Coupon is valid',
            coupon: {
                id: coupon._id,
                code: coupon.code,
                nameOfUser: coupon.nameOfUser,
                courseId: coupon.courseId,
                courseName: coupon.courseName,
                expiresAt: coupon.expiresAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while validating coupon'
        });
    }
};

// Apply coupon (mark as used after enrollment)
const applyCoupon = async (req, res) => {
    try {
        const { code, userEmail } = req.body;

        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase().trim(),
            userEmail: userEmail.toLowerCase().trim()
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            });
        }

        // Validate before applying
        const validation = coupon.isValid();
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        // Mark coupon as used
        coupon.used = true;
        coupon.usedAt = new Date();
        await coupon.save();

        res.json({
            success: true,
            message: 'Coupon applied successfully',
            coupon: {
                id: coupon._id,
                code: coupon.code,
                courseId: coupon.courseId,
                courseName: coupon.courseName
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while applying coupon'
        });
    }
};

// Get all coupons (admin view)
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        
        res.json({
            success: true,
            coupons: coupons.map(coupon => ({
                id: coupon._id,
                code: coupon.code,
                nameOfUser: coupon.nameOfUser,
                userEmail: coupon.userEmail,
                courseName: coupon.courseName,
                isActive: coupon.isActive,
                used: coupon.used,
                usedAt: coupon.usedAt,
                createdAt: coupon.createdAt,
                expiresAt: coupon.expiresAt
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching coupons'
        });
    }
};

// Get coupons by user email
const getCouponsByUser = async (req, res) => {
    try {
        const { email } = req.params;
        
        const coupons = await Coupon.find({ 
            userEmail: email.toLowerCase().trim() 
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            coupons: coupons.map(coupon => ({
                id: coupon._id,
                code: coupon.code,
                courseName: coupon.courseName,
                isActive: coupon.isActive,
                used: coupon.used,
                usedAt: coupon.usedAt,
                expiresAt: coupon.expiresAt
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user coupons'
        });
    }
};

// Update coupon (admin only - for reactivating, etc.)
const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Don't allow updating code, userEmail, or nameOfUser
        const allowedUpdates = ['isActive', 'expiresAt'];
        const updateData = {};
        
        allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) {
                updateData[field] = updates[field];
            }
        });

        const coupon = await Coupon.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            });
        }

        res.json({
            success: true,
            message: 'Coupon updated successfully',
            coupon: {
                id: coupon._id,
                code: coupon.code,
                nameOfUser: coupon.nameOfUser,
                isActive: coupon.isActive,
                expiresAt: coupon.expiresAt
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete coupon (admin only)
const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await Coupon.findByIdAndDelete(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            });
        }

        res.json({
            success: true,
            message: 'Coupon deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while deleting coupon'
        });
    }
};

module.exports = {
    createCoupon,
    validateCoupon,
    applyCoupon,
    getAllCoupons,
    getCouponsByUser,
    updateCoupon,
    deleteCoupon
};