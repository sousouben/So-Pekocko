const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

//ordre important: auth avant multer sinon image de requete non identifie peuvent etre enregistre
router.get('/', auth, sauceCtrl.getAllSauces);//récupère des infos
router.post('/', auth, multer, sauceCtrl.createSauce); //donne des infos
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//remplace une info
router.delete('/:id', auth, sauceCtrl.deleteSauce);//supprimer une sauce
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;