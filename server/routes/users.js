const express = require('express');
const router = express.Router();
const User = require('../models/User');
var checkAuth = require('../services/checkAuth');


//renvoie la liste de tous les utilisateurs
router.get('/', checkAuth.isAuthenticated, (req, res) => {
  User.find({}, {
    password: 0,
    __v: 0
  }, function (err, users) {
    res.send(users);
  })
});

//crée un nouvel utilisateur
router.post('/register', (req, res) => {
  var newUser = req.body.user;
  //on teste l'existence d'un utilisateur avec le même pseudo
  User.findOne({
    pseudo: req.body.user.pseudo
  }, function (err, existingUsr) {
    if (existingUsr) {
      res.status(500);
      res.send({
        "message": "L'utilisateur existe déjà."
      });
    } else {
      newUser.droits = 1;
      new User(newUser).save(function (err, createdUser) {
        res.send({
          "message": "OK"
        });
      });
    }
  });
});

//test la disponibilité d'un pseudo dans la base de données
router.post('/check', (req, res) => {
  console.log('POST /Uses/check');
  var pseudo = req.body.pseudo;
  if (typeof pseudo === 'undefined') {
    res.status(500);
    res.send({
      "message": "Le pseudo est manquant"
    });
  } else {
    User.findOne({
      pseudo: pseudo
    }, function (err, user) {
      if (!user) {
        //l'utilisateur est disponible
        res.send({
          "message": "OK"
        });
      } else {
        res.status(302);
        res.send({
          "message": "Pseudo déjà utilisé"
        });
      }
    });
  }
});

module.exports = router;
