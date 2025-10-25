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
    exercises: {
        type: String
    },
    titleOfCreator:{
        type: String
    },
    enrollment: {
        type: Number
    },
    price: {    
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,   
        required: true
    },
    imageUrl2: {
        type: String,   
        required: true
    },
    createdBy: {
        type: String,   
        required: true
    },
    totalLength: {
        type: String,   
        required: true
    },
     section: {
        type: String,   
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    whatYoullLearn:[
        {
            number: Number,
            title: String,
            description: String,
            link: String
        }
    ],
    skillsThatMatter:[
        {
             name: String 
        }
    ],
    curriculumCard: [
        {
            number: Number,
            title: String,
            topics: [String]
        }
    ],
    course:[
        {
            part: Number,
            lessons: 
                {
                    title: String,
                    videoId: String,
                    description: String,
                    keyNotes: String
                }
            
        }
    ],
    quizQuestions: [
        {
            question: String,
            options: [String],
            correctAnswer: String
        }
    ]
}, { timestamps: true })    

module.exports = mongoose.model('Course', CourseSchema);    
