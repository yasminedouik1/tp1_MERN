app.get('/', articleController.getAllArticles);
app.get('/:id', articleController.getArticleById);
app.post('/', articleController.createArticle);
