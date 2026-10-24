const express = require('express');
const router = express.Router();

const {
    registerUser, loginUser,
    getUserProfile,
    getAllUsers,
} = require('../controllers/userController');

const { protect ,adminOnly} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

router.get('/', protect, getAllUsers);
/*
router.get('/:id', protect, userController.getUserById);
router.get('/', protect, userController.getUsers);
router.post('/', protect, userController.createUser);
router.delete('/:id', protect, adminOnly, userController.deleteUser);
*/
module.exports = router;