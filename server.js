const express = require('express'); // 1. charger la bibliothèque Express
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // charger les variables d'environnement depuis le fichier .env

const app = express(); // 2. créer l’application : c’est notre serveur
const PORT = process.env.PORT || 3000;

app.use( express.json() ) ;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Serveur MERN en écoute sur http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Erreur critique de démarrage du serveur :', error);
    process.exit(1);
  }
})();




//Execr 1 ques1  : info sur app 

app.get('/about', (req, res) => {
  res.json({
    application: 'API du blog',
    auteur: 'Votre Nom',
    version: '1.0.0'
  });
});


app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

