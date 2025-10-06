const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buttonText: {
        type: String
    },
    price: {    
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,   
        required: true
    },
    totalLength: {
        type: String,   
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })    

module.exports = mongoose.model('Course', CourseSchema);    
