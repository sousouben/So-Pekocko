const express = require('express');//Import du framework Express
const router = express.Router();//Création d'un router
const userCtrl = require('../controllers/user');//Import du middleware pour un utilisateur

router.post('/signup',userCtrl.signup);//Les différentes routes avec leur endpoints pour les utilisateurs
router.post('/login',userCtrl.login);

module.exports = router;//Export du router pour les utilisateurs