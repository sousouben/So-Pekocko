//Imports
const http = require('http');//Import du package HTTP et creation du serveur
const app = require('./app');//Import de l'application Express dans le serveur

const normalizePort = val => {//La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne

  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');//Récupération d'un port valide selon la plateforme de déploiement ou le port 3000
app.set('port', port);//Attribution du port à l'application

const errorHandler = error => {//Traitement des erreurs serveur
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);//Création du server app.js de Node 

server.on('error', errorHandler);//Gestion des erreurs serveur
server.on('listening', () => {//Lancement du serveur
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);//Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
