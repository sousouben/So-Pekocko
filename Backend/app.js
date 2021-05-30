const express = require('express');// Import du framework Express
const bodyParser = require('body-parser');//Import du package body-parser pour traiter l'objet JSON envoyé par le frontend
const mongoose = require('mongoose');//Facilite les interactions avec la base de données
const path = require('path');//Donne accès au chemin de notre système de fichier

const helmet = require('helmet');// Installation de Helmet qui configure de manière appropriée des en-têtes HTTP liés à la sécurité
require('dotenv').config();//sécurisation des données sensibles en les enregistrant dans un fichier .env

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

app.use((req, res, next) => { //autorisation d acces à l'API
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à API depuis le port 4200  
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
  // ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// envoyer des requêtes avec les méthodes mentionnées
  next();
});

app.use(bodyParser.json())//définition de la fonction json comme middleware global pour l'application
app.use(helmet())//Utilisation de Helmet

app.use('/images',express.static(path.join(__dirname, 'images')));//indique à Express qu'il faut gérer la ressource images de manière statique
app.use('/api/sauces', saucesRoutes);//enregistrement du routeur pour toutes les demandes faites vers /api/sauces
app.use('/api/auth', userRoutes);//enregistrement du routeur pour toutes les demandes faites vers /api/auth

module.exports = app;