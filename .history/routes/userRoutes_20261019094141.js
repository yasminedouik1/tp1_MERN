const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
    registerUser, loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/authController');
const { protect ,adminOnly} = require('../middleware/authMiddleware');

router.get('/:id', userController.getUserById);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;