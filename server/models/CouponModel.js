const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const CouponSchema = new Schema({
    nameOfUser: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    used: {
        type: Boolean,
        default: false
    },
    usedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: String,
        default: 'admin'
    }
}, { timestamps: true })

module.exports = mongoose.model('Coupon',CouponSchema);