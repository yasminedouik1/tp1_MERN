const express = require('express'); // 1. charger la bibliothèque Express
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // charger les variables d'environnement depuis le fichier .env

const app = express(); // 2. créer l’application : c’est notre serveur
const PORT = process.env.PORT || 3000;

app.use( express.json() ) ;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Serveur MERN en ecoute sur http://localhost:${PORT}`);
  });
  } catch (error) {
    console.error('Erreur critique de demarrage du serveur :', error);
    process.exit(1);
  }
});

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



const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);




// 4. démarrer le serveur : il attend les requêtes sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});


