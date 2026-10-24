const express = require('express');
const router = express.Router();

const {
    getAllArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');


/*
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
*/

module.exports = router;