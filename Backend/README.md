###Contexte du projet###
So Pekocko est une entreprise familiale de 10 salariés.
Son activité principale est la création de sauces piquantes dont la composition est tenue secrète.
Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

###Objectifs et Compétences évaluées###
Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni

Implémenter un modèle logique de données conformément à la réglementation
Stocker des données de manière sécurisée
Mettre en œuvre des opérations CRUD de manière sécurisée

###API REST###
Sécurité OWASP et RGPD

##Installation##
Le lien du dépôt GitHub pour la partie frontend est le suivant https://github.com/OpenClassrooms-Student-Center/dwj-projet6.git

Cloner ce projet depuis GitHub.
💡   Faire tourner le Frontend
Ouvrir le terminal sur ce dossier et exécuter npm install pour installer les dépendances.
Exécuter npm install node-sass pour installer sass.
Le projet a été généré avec Angular CLI version 7.0.2.
Démarrer ng serve (ou npm start) pour avoir accès au serveur de développement.
Rendez-vous sur http://localhost:4200.
L'application va se recharger automatiquement si vous modifiez un fichier source.

💡   Faire tourner le Backend
Ouvrir le terminal sur ce dossier.
Pour utiliser le serveur, chargez le package nodemon : npm install -g nodemon.
Puis lancez le serveur: nodemon server.
Pour faire court
Si les packages sont déja installés, ces commandes suffisent à démarrer les serveurs.

ng serve via le terminal sur le frontend
nodemon server via le terminal sur le backend
Se connecter à l'url : http://localhost:4200
🖥   Connexion
Ouvrir localhost:4200 dans votre navigateur.
Pour s'inscrire sur l'application, l'utilisateur doit fournir un email et un mot de passe contenant 08 caractères minimum (dont 1 majuscule, 1 minuscule, 1 chiffre, pas d'espaces).

Url pour se connecter:
créer un fichier .env : mongodb+srv://{username}:{password}@cluster0.kc0f6.mongodb.net/so_pekocko?retryWrites=true&w=majority

###Éléments fournis###
Frontend (Fournit lors de l'installation)