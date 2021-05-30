const bcrypt = require('bcrypt');//Import du package de chiffrement bcrypt pour chiffrer et créer un hash des mots de passe utilisateur
const jwt = require('jsonwebtoken');//Import du package jsonwebtoken pour créer un token d'identification pour chaque utilisateur connecté et authentifié
const User = require('../models/User');//Import du modèle user
const passwordValidator = require('password-validator');//Import du package passeword-validatoir pour créer un schéma de validation de mot de passe

const schema = new passwordValidator();//Création d'un schéma
schema
.is().min(8)                                    // Longueur minimale 8   
.is().max(50)                                  // Longueur maximale 50
.has().uppercase()                              // Doit avoir des lettres majuscules 
.has().lowercase()                              // Doit avoir des lettres minuscules 
.has().digits(1)                                // Doit avoir au moins 1 chiffre
.has().not().spaces();                          // Ne doit pas avoir d'espaces  

// Créer un compte utilisateur
exports.signup = (req, res, next) => {//nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois. Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé. c'est une fonction asynchrone qui renvoie une Promise.
  if(schema.validate(req.body.password)){
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()//dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    
  }else{
    return res.status(400).json({
      message: 'Le mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !'
    })
  }
    
  };

  // vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides
  exports.login = (req, res, next) => {//nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)//nous utilisons la fonction compare debcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });//401 erreur Unauthorized
            }
            res.status(200).json({//contenant l'ID utilisateur et un token
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };