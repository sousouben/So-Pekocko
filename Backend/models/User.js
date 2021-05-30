const mongoose = require('mongoose');//Import du package Mongoose pour faciliter les interactions avec la BDD MongoDB
const uniqueValidator = require('mongoose-unique-validator');//Plug-in qui empêche d'utiliser plusieurs fois la même adresse email

const userSchema = mongoose.Schema({//Schema mongoose qui sert de model
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, require: false }
});

userSchema.plugin(uniqueValidator);//Application du plugin Mongoose Unique Validator au modèle utilisateur

module.exports = mongoose.model('User', userSchema);//Export du modèle utilisateur