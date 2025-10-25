const express = require('express');
const router = express.Router();
const {
    createCourse,
    getAllCourse,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    progressCourse,
    getCoursesByUser,
    saveQuizResults,
    getQuizResults,
    issueCertificate
} = require('../controllers/courseUsers');

// GET all courses
router.get('/', getAllCourse);

// GET courses by user email
router.get('/user/:email', getCoursesByUser);

// GET single course
router.get('/:id', getSingleCourse);

// GET quiz results
router.get('/:id/quiz-results', getQuizResults);

// POST create new course
router.post('/enroll', createCourse);

// DELETE course
router.delete('/:id', deleteCourse);

// PUT update course (full update)
router.put('/:id', updateCourse);

// PATCH update course progress
router.patch('/:id/progress', progressCourse);

// POST save quiz results
router.post('/:id/quiz-results', saveQuizResults);

// POST issue certificate
router.post('/:id/certificate', issueCertificate);

module.exports = router;