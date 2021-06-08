const bcrypt = require('bcrypt');

//Import du package jsonwebtoken pour créer un token d'identification
//pour chaque utilisateur connecté et authentifié
const jwt = require('jsonwebtoken');

////////Importation du package de cryptage des emails/////////
var CryptoJS = require("crypto-js");

//Import du modèle user
const User = require('../models/User');

////////Importation du package de validation des emails/////////
const validator = require("validator");





require('dotenv').config();


// Il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré

// creation d un utilisateur et enregistrement dans la base de données, en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec.
// La fonction User.updateOne permets de récupérer l'id renvoyer par la BDD et de le sauvegarder dans la BDD

//Middleware pour l'inscription d'un utilisateur
exports.signup = (req, res, next) => {
    var email = CryptoJS.AES.encrypt(req.body.email, "mailsecret").toString();
    //Validation de l'email
    if (validator.isEmail(req.body.email) !== true) {
        return res.status(401).json({error: "Email non valide"});
    
}
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: email,
                password: hash
            }); 
            user.save((err, user) => {
                if (err) {
                    return res.status(500).json({ error: err });
                } else {
                    User.updateOne({ email: req.body.email }, { userId: user.id }).then(result => {
                        return res.status(201).json({ message: 'Utilisateur créé !' });
                    })
                }

            });
        })
        .catch(error => res.status(500).json({ error }));
};


//Middleware pour la connexion d'un utilisateur
exports.login = (req, res, next) => { 
    var email = CryptoJS.AES.encrypt(req.body.email, "mailsecret").toString();
    User.findOne({ email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};