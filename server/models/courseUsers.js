const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseUsersSchema = new Schema({
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
            title: String,
            lessons: 
                {
                    title: String,
                    videoId: String,
                    description: String,
                    keyNotes: String,
                    
                },
            status: {type: String, default: "locked"},
            completedAt: { type: Date } // field for completion timestamp
        }
    ],
    quizQuestions: [
        {
            question: String,
            options: [String],
            correctAnswer: String
        }
    ],
    //  Quiz Results Section
    quizResults: {
        attempts: [{
            attemptNumber: { type: Number, required: true },
            score: { type: Number, required: true }, 
            totalQuestions: { type: Number, required: true },
            percentage: { type: Number, required: true },
            passed: { type: Boolean, required: true },
            answers: [{
                questionId: { type: String, required: true },
                question: { type: String, required: true },
                userAnswer: { type: String, required: true },
                correctAnswer: { type: String, required: true },
                isCorrect: { type: Boolean, required: true }
            }],
            timeSpent: { type: Number }, // in seconds
            completedAt: { type: Date, default: Date.now }
        }],
        bestScore: { type: Number, default: 0 },
        bestPercentage: { type: Number, default: 0 },
        totalAttempts: { type: Number, default: 0 },
        passedAttempts: { type: Number, default: 0 },
        lastAttempt: { type: Date }
    },
    // Course Completion Certificate
    certificate: {
        issued: { type: Boolean, default: false },
        issuedAt: { type: Date },
        certificateId: { type: String },
        finalScore: { type: Number },
        completionDate: { type: Date }
    },
    //  Overall Course Progress
    progress: {
        completedParts: { type: Number, default: 0 },
        totalParts: { type: Number, default: 0 },
        completionPercentage: { type: Number, default: 0 },
        lastActivity: { type: Date },
        startedAt: { type: Date, default: Date.now },
        completedAt: { type: Date }
    },
    userName:{
        type: String
    },
    userEmail:{
        type: String
    },
    userId:{
        type: String
    },
    status:{
        type: String,
        default: 'not started',
        enum: ['not started', 'in progress', 'completed', 'certified','enrolled'] 
    },
    couponCode:{
        type: String
    },
    courseId:{
        type: String
    }

}, { timestamps: true })    

module.exports = mongoose.model('CourseUsers', CourseUsersSchema);