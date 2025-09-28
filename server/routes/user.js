const express = require('express');
const router = express.Router();
const {createUsers,
    getAllUsers,
    getSingleUsers,
    deleteUsers,
    updateUsers,
    login,
    
    me} = require('../controllers/user')

const { authToken } = require('../utils/authMiddleware')


//get all Users
router.get('/',getAllUsers)

// login and signup first
router.post('/login', login)
router.post('/signup',createUsers)

//get a single User
router.get('/:id',getSingleUsers)

// auth-protected current user info from token
router.get('/me/profile', authToken, me)

//delete Users
router.delete('/:id',deleteUsers)

//update Users
router.patch('/:id',updateUsers)


module.exports = router;