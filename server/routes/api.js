const express = require('express');
const router = express.Router();
var User = require('../models/User');
var passwordHash = require('password-hash');


//connexion de l'utilisateur
//met la variable session "user" avec les données courantes
router.post('/login', (req, res) => {
  var pseudo = req.body.pseudo;
  var pw = req.body.password;
  if (typeof pseudo === 'undefined' || typeof pw === 'undefined') {
    res.status(403);
    res.send({
      "login": "Le mot de passe ou le pseudo est manquant"
    });
  } else {
    //on checke si l'user existe dans la base de données
    User.findOne({
      pseudo: pseudo
    }, function (err, user) {
      //si le pseudo n'existe pas
      if (!user) {
        res.status(403);
        res.send({
          "message": "Pseudo inexistant"
        });
      } 
      //si le  pseudo + mdp sont corrects
      else if(passwordHash.verify(pw, user.password)){
        //on met en place la session côté serveur pour le client qui vient de se connecter
        req.session.user = user;
        console.log('Connexion de l utilisateur : ', user);
        //on enlève le mot de passe pour envoyer les données au client
        var usrSend = JSON.parse(JSON.stringify(user));
        delete usrSend.password;
        delete usrSend.__v;
        res.send({
          "message": "OK",
          "user": usrSend
        });
      }
      //si pseudo oK mais pas le bon mot de passe
      else{
        res.status(403);
        res.send({
          "message": "Mauvais mot de passe"
        });
      }
    });
  }
});

//déconnexion de l'utilisateur courant
router.get('/logout', (req, res) => {
  delete req.session.user;
  console.log('Déconnexion de l utilisateur : ', req.session.user);
  res.send({
    "logout": true
  });
});

module.exports = router;
