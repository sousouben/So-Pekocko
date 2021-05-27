const express = require('express');// Importation d'express permettant de déployer nos API beaucoup plus rapidement
const bodyParser = require('body-parser');//Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande. 
const mongoose = require('mongoose');//Mongoose est un package qui facilite les interactions avec notre base de données
const path = require('path');

const helmet = require('helmet');// utilisation du module 'helmet' pour la sécurité
require('dotenv').config();//module sans dépendance qui charge les variables d'environnement à partir d'un .env

const saucesRoutes = require('./routes/sauce');//router
const userRoutes = require('./routes/user');

//crée une application
const app = express();

// Connexion à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
mongoose.connect(process.env.url_connexion,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  //Accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Origin', '*');
  //on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(bodyParser.json())
app.use(helmet())

app.use('/images',express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;