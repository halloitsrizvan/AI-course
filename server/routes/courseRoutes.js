const express = require('express');
const router = express.Router();
const {createCourse,
    getAllCourse,
    getSingleCourse,
    deleteCourse,
    updateCourse,} = require('../controllers/courseControl')


//get all course
router.get('/',getAllCourse)

//get a single course
router.get('/:id',getSingleCourse)

//add a course
router.post('/',createCourse)

//delete course
router.delete('/:id',deleteCourse)

//update course
router.patch('/:id',updateCourse)


module.exports = router;