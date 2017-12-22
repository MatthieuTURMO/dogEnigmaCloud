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
      if (!user) {
        res.status(403);
        res.send({
          "login": "Pseudo inexistant"
        });
      } 
      else if(passwordHash.verify(pw, user.password)){
        //on met en place la session côté serveur pour le client qui vient de se connecter
        req.session.user = user;
        console.log('Connexion de l user : ', user);
        //on enlève le mot de passe pour envoyer les données au client
        var usrSend = JSON.parse(JSON.stringify(user));
        delete usrSend.password;
        delete usrSend.__v;
        res.send({
          "login": "OK",
          "user": usrSend
        });
      }
      else{
        res.status(403);
        res.send({
          "login": "Mauvais mot de passe"
        });
      }
    });
  }
});

//déconnexion de l'utilisateur courant
router.get('/logout', (req, res) => {
  delete req.session.user;
  res.send({
    "logout": true
  });
});

module.exports = router;
