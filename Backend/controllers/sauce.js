const Sauce = require('../models/Sauce');//Récupération du modèle 'sauce'
const fs = require('fs');// Récupération du module 'file system' de Node
const { error } = require('console');

// Permet de créer une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  //Création d'une instance du modèle Sauce
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // Sauvegarde de la sauce dans la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};

// Récuperer une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Récuperer la liste de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//like or dislike sauce
exports.likeOrDislike = (request, response, next) => {
  switch (request.body.like) {
    case 0:
      Sauce.findOne({ _id: request.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find((user) => user === request.body.userId)) {
            Sauce.updateOne({ _id: request.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: request.body.userId },
                _id: request.params.id,
              })
              .then(() => {
                response.status(200).json({ message: "Votre avis a été supprimé" });
              })
              .catch((error) => {
                response.status(400).json({ error: error });
              });
          }
          if (sauce.usersDisliked.find((user) => user === request.body.userId)) {
            Sauce.updateOne({ _id: request.params.id },
              {
                $inc: { dislikes: -1 }, //enlève son dislike 
                $pull: { usersDisliked: request.body.userId },
                _id: request.params.id,
              })
              .then(() => {
                response.status(200).json({ message: "Votre avis a été supprimé" });
              })
              .catch((error) => {
                response.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          response.status(404).json({ error: error });
        });
      break;
    //like
    case 1:
      Sauce.updateOne({ _id: request.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: request.body.userId },

        _id: request.params.id,
      })
        .then(() => {
          response.status(200).json({ message: "Merci ! Votre avis a été pris en compte" });
        })
        .catch((error) => {
          response.status(400).json({ error: error });
        });
      break;
    //dislike
    case - 1:
      Sauce.updateOne({ _id: request.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: request.body.userId },
          _id: request.params.id,
        })
        .then(() => {
          response.status(200).json({ message: "Merci ! Votre avis a été pris en compte!" });
        })
        .catch((error) => {
          response.status(400).json({ error: error });
        });
      break;
    default:
      console.error("Erreur");
  }
}