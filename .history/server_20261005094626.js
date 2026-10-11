const express = require('express'); // 1. charger la bibliothèque Express
const app = express(); // 2. créer l’application : c’est notre serveur
const PORT = 3000;
app . use( express . json () ) ;



const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);


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
  { id: 1, name: 'Aya', email: 'aya@example.com', role: 'user' },
  { id: 2, name: 'Omar', email: 'omar@example.com', role: 'user' },
  { id: 3, name: 'Youssef', email: 'youssef@example.com', role: 'user' }
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


