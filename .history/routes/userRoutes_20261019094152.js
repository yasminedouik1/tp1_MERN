const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
    registerUser, loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/authController');
const { protect ,adminOnly} = require('../middleware/authMiddleware');

router.get('/:id', protect, userController.getUserById);
router.get('/', protect, userController.getUsers);
router.post('/', protect, userController.createUser);
router.delete('/:id', protect, adminOnly, userController.deleteUser);

module.exports = router;