const express = require('express');//Import du framework Express
const router = express.Router();

const auth = require('../middleware/auth');//Import du middleware d'authentification
const multer = require('../middleware/multer-config');//Import du middleware pour la gestion des images
const sauceCtrl = require('../controllers/sauce');//Import du middleware pour les sauces

//Les différentes routes avec leur endpoints pour les sauces
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;//Export du router pour les sauces