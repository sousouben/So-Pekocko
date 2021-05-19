const express = require('express');// Importation d'express
const bodyParser = require('body-parser');//Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande. 
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

const app = express();

mongoose.connect('mongodb+srv://sousou:cqe6A8sPfdH7yzk@cluster0.kc0f6.mongodb.net/so_pekocko?retryWrites=true&w=majority',
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
app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/sauces ', (req, res, next) => {
  const sauces = [
    {
      _id: '',
      userId: '',
      name: '',
      manufacturer: '',
      description: '',
      mainPepper: '',
      imageUrl: '',
      heat:0,
      likes: 0,
      dislikes:0,
      usersLiked: [string],
      usersDisliked: [string],
    },
  ];
  res.status(200).json(sauces);
});

module.exports = app;