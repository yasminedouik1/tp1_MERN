const Article = require('../models/articleModel');
const User = require('../models/userModel');


let prochainId = 4;


const getAllArticles = (req, res) => {
  const { author } = req.query; // = const author = req.query.author;
  let resultat = articles;

  if (author) { // si le client a précisé ?author=...
    resultat = articles.filter(a => a.author === author);
  }

  res.json({ total: resultat.length, articles: resultat });
}

const getArticleById = (req, res) => {
  const id = Number(req.params.id); // "2" -> 2
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  res.json(article);
}


const createArticle = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) { // validation : les deux champs sont obligatoires
    return res.status(400).json({ error: "Le titre et l’auteur sont obligatoires" });
  }

  const nouvelArticle = { id: prochainId, title: title, author: author };
  prochainId = prochainId + 1;

  articles.push(nouvelArticle);

  res.status(201).json({ message: 'Article créé', article: nouvelArticle });
}

const updateArticle = (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body; //destructuration

  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  if (title) {
    articles[index].title = title;
  }
  if (author) {
    articles[index].author = author;
  }

  res.status(200).json({ message: 'Article ${id} mis à jour', article: articles[index] });

}

const deleteArticle = (req, res) => {
  const id = Number(req.params.id);
  const articleExiste = articles.some(a => a.id === id);

  if (!articleExiste) {
    return res.status(404).json({ error: 'Impossible de supprimer : article ${id} introuvable' });
  }

  articles = articles.filter(a => a.id !== id);

  res.status(200).json({ message: 'Article ${id} supprimé avec succès' });

}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
}
