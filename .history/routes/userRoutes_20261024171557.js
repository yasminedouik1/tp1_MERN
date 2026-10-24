const express = require('express');
const router = express.Router();

const {
    registerUser, loginUser,
    getUserProfile,
    getAllUsers,
    updatePassword,
} = require('../controllers/userController');

const { protect , adminOnly} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect,adminOnly, getAllUsers);

router.put('/update-password', protect, updatePassword);


module.exports = router;



/*
router.get('/:id',userController.getUserById);
router.get('/',  userController.getUsers);
router.post('/',  userController.createUser);
router.delete('/:id', userController.deleteUser);
*/