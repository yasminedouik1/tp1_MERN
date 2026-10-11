const express = require('express'); // 1. charger la bibliothèque Express
const app = express(); // 2. créer l’application : c’est notre serveur
const PORT = 3000;
app . use( express . json () ) ;

// 3. une route : quand un client demande GET /, Express exécute cette fonction
app.get('/', (req, res) => {
  res.json({ message: "Bonjour, je suis l’API du blog" });
});

const articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

// GET /api/articles -> tous les articles
app.get('/api/articles', (req, res) => {
  res.json({ total: articles.length, articles: articles });
});

// GET /api/articles/2 -> l’article dont l’id vaut 2
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id); // "2" -> 2
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  res.json(article);
});

// GET /api/articles -> tous les articles
// GET /api/articles?author=Aya -> seulement ceux d’Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query; // = const author = req.query.author;
  let resultat = articles;

  if (author) { // si le client a précisé ?author=...
    resultat = articles.filter(a => a.author === author);
  }

  res.json({ total: resultat.length, articles: resultat });
});

let prochainId = 4; // le prochain id à attribuer (les ids 1, 2 et 3 existent déjà)

// POST /api/articles -> crée un article avec { "title": "...", "author": "..." }

app.post('/api/articles', (req, res) => {
  const { title, author } = req.body; // déstructuration (étape 5)

  if (!title || !author) { // validation : les deux champs sont obligatoires
    return res.status(400).json({ error: "Le titre et l’auteur sont obligatoires" });
  }

  const nouvelArticle = { id: prochainId, title: title, author: author };
  prochainId = prochainId + 1;

  articles.push(nouvelArticle);

  res.status(201).json({ message: 'Article créé', article: nouvelArticle });
});


//Execr 1 ques1  : info sur app 

app.get('/about', (req, res) => {
  res.json({
    application: 'API du blog',
    auteur: 'Votre Nom',
    version: '1.0.0'
  });
});



//quet 2 Les utilisateurs
const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Omar', email: 'omar@example.com' },
  { id: 3, name: 'Youssef', email: 'youssef@example.com' }
];

// quest 3 list utulisateur ou bien 404 
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  res.json(user);
});


// quest 4 
app.post('/contact', (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: "L'email et le message sont obligatoires" });
  }
  res.status(200).json({ message: 'Merci, votre message a bien été reçu' });
});

//quest 5 les filtres utusliateur 
app.get('/api/users', (req, res) => {
  const { name } = req.query;
  let resultat = users;
  if (name) {
    resultat = users.filter(u => u.name === name);
  }
  res.json({ total: resultat.length, users: resultat });
});


// 4. démarrer le serveur : il attend les requêtes sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});


