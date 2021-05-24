const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

//ordre important: auth avant multer sinon image de requete non identifie peuvent etre enregistre
router.get('/ ', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;