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




app.use('/api/users', userRoutes);




// 4. démarrer le serveur : il attend les requêtes sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});


