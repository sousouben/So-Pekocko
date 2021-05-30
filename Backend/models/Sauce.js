const mongoose = require('mongoose');//Import du package Mongoose pour faciliter les interactions avec la BDD MongoDB

const sauceSchema = mongoose.Schema({//Création d un schéma de données  
  userId: { type: String, required: true },
  name: { type: String, required: true }, 
  manufacturer:{ type:String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type:Number, default: 0 },
  dislikes: { type:Number, default: 0 },
  usersLiked: { type: [String], require: false },
  usersDisliked: { type: [String], require: false }
});

module.exports = mongoose.model('Sauce', sauceSchema);//Exportation du schéma en tant que modèle Mongoose appelé « Sauce », le rendant disponible pour mon application Express.