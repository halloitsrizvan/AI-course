const CourseUsers = require('../models/courseUsers')
const mongoose = require('mongoose')

//get all courses
const getAllCourse = async (req, res) => {
    try {
        const courses = await CourseUsers.find({}).sort({ createdAt: -1 })
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching courses' })
    }
}

//get a single course
const getSingleCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' })
    }
    
    try {
        const course = await CourseUsers.findById(id)
        if (!course) {
            return res.status(404).json({ error: 'Course not found' })
        }
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching course' })
    }
}

//create a course db
const createCourse = async (req, res) => {
    try {
        const courses = await CourseUsers.create(req.body);
        res.status(201).json(courses); // Changed to 201 for resource creation
        console.log(req.body);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//delete a Course
const deleteCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' })
    }
    
    try {
        const course = await CourseUsers.findByIdAndDelete(id)
        if (!course) {
            return res.status(404).json({ error: 'Course not found' })
        }
        res.status(200).json({ message: 'Course deleted successfully', course })
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting course' })
    }
}

//update course - FIXED VERSION
const updateCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' });
    }

    try {
        const updated = await CourseUsers.findByIdAndUpdate(
            id,
            req.body, // Remove $set wrapper since frontend sends the entire course object
            { new: true, runValidators: true } // Added runValidators
        );

        if (!updated) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(updated);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Error updating course data', error: error.message });
    }
};

//progressCourse - IMPROVED VERSION
const progressCourse = async (req, res) => {
    const { id } = req.params;
    const { partIndex } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' });
    }

    if (partIndex === undefined || partIndex === null) {
        return res.status(400).json({ error: 'partIndex is required' });
    }

    try {
        const course = await CourseUsers.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if partIndex is valid
        if (partIndex < 0 || partIndex >= course.course.length) {
            return res.status(400).json({ error: 'Invalid part index' });
        }

        // Mark current part as completed
        course.course[partIndex].status = 'completed';

        // Unlock next part (if exists)
        if (partIndex + 1 < course.course.length) {
            course.course[partIndex + 1].status = 'unlocked';
        }

        await course.save();
        res.json(course);
    } catch (err) {
        console.error('Progress update error:', err);
        res.status(500).json({ message: 'Server error while updating progress', error: err.message });
    }
}

// NEW: Get courses by user email
const getCoursesByUser = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const courses = await CourseUsers.find({ userEmail: email }).sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching user courses:', error);
        res.status(500).json({ error: 'Server error while fetching user courses' });
    }
}

// Save quiz results
const saveQuizResults = async (req, res) => {
    const { id } = req.params;
    const { score, totalQuestions, answers, timeSpent } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' });
    }

    try {
        const course = await CourseUsers.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const percentage = Math.round((score / totalQuestions) * 100);
        const passed = percentage >= 60; // 60% passing threshold
        const attemptNumber = (course.quizResults?.attempts?.length || 0) + 1;

        const quizAttempt = {
            attemptNumber,
            score,
            totalQuestions,
            percentage,
            passed,
            answers,
            timeSpent,
            completedAt: new Date()
        };

        // Initialize quizResults if it doesn't exist
        if (!course.quizResults) {
            course.quizResults = {
                attempts: [],
                bestScore: 0,
                bestPercentage: 0,
                totalAttempts: 0,
                passedAttempts: 0
            };
        }

        // Add the attempt
        course.quizResults.attempts.push(quizAttempt);
        course.quizResults.totalAttempts += 1;

        // Update best scores
        if (score > course.quizResults.bestScore) {
            course.quizResults.bestScore = score;
        }
        if (percentage > course.quizResults.bestPercentage) {
            course.quizResults.bestPercentage = percentage;
        }

        // Update passed attempts
        if (passed) {
            course.quizResults.passedAttempts += 1;
        }

        course.quizResults.lastAttempt = new Date();

        // Update course status if passed
        if (passed) {
            course.status = 'certified';
            course.certificate = {
                issued: true,
                issuedAt: new Date(),
                certificateId: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                finalScore: percentage,
                completionDate: new Date()
            };
        }

        // Update progress
        course.progress = {
            completedParts: course.course.filter(part => part.status === 'completed').length,
            totalParts: course.course.length,
            completionPercentage: Math.round((course.course.filter(part => part.status === 'completed').length / course.course.length) * 100),
            lastActivity: new Date(),
            startedAt: course.progress?.startedAt || new Date(),
            completedAt: passed ? new Date() : course.progress?.completedAt
        };

        await course.save();
        res.json(course);
    } catch (err) {
        console.error('Save quiz results error:', err);
        res.status(500).json({ message: 'Server error while saving quiz results', error: err.message });
    }
};

// Get quiz results
const getQuizResults = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' });
    }

    try {
        const course = await CourseUsers.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({
            quizResults: course.quizResults,
            certificate: course.certificate,
            progress: course.progress
        });
    } catch (err) {
        console.error('Get quiz results error:', err);
        res.status(500).json({ message: 'Server error while fetching quiz results', error: err.message });
    }
};

// Issue certificate (manual trigger if needed)
const issueCertificate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' });
    }

    try {
        const course = await CourseUsers.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if all parts are completed
        const allPartsCompleted = course.course.every(part => part.status === 'completed');
        if (!allPartsCompleted) {
            return res.status(400).json({ error: 'Complete all course parts before issuing certificate' });
        }

        course.certificate = {
            issued: true,
            issuedAt: new Date(),
            certificateId: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            finalScore: course.quizResults?.bestPercentage || 0,
            completionDate: new Date()
        };
        course.status = 'certified';

        await course.save();
        res.json(course);
    } catch (err) {
        console.error('Issue certificate error:', err);
        res.status(500).json({ message: 'Server error while issuing certificate', error: err.message });
    }
};

module.exports = {
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
}