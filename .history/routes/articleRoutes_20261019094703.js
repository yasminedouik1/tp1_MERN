const express = require('express');
const router = express.Router();

const {
    getAllArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

/*
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
*/

module.exports = router;