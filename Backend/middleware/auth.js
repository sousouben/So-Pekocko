const jwt = require('jsonwebtoken');//Création d'un token pour gérer l'authentification  
const maskdata = require('maskdata');
require('dotenv').config()

module.exports = (req, res, next) => {//Ce middleware permettra de protéger les routes sélectionnées et permettra de vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de requêtes
  try {
    const token = req.headers.authorization.split(' ')[1];//Extraction du token du header Authorization de la requête entrante. Il contient le mot-clé Bearer . Utilisation de la fonction split pour récupérer tout après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch ;
    const decodedToken = jwt.verify(token, process.env.TOKEN);//utilisation de la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée
    const userId = decodedToken.userId;//extraction de l'ID utilisateur de notre token 
    if (req.body.userId && req.body.userId !== userId) {//si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur sinon  l‘utilisateur est authentifié. Nous passons l'exécution à l'aide de la fonction next()
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {//gestion des erreurs
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};