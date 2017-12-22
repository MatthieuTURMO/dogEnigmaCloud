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
router.post('/', checkAuth.isAuthenticated, (req, res) => {
  var newUser = {
    "pseudo": req.body.pseudo,
    "password": req.body.password
  };
  //on teste l'existence d'un utilisateur avec le même pseudo
  User.findOne({
    pseudo: req.body.pseudo
  }, function (err, existingUsr) {
    if (existingUsr) {
      res.status(500);
      res.send({
        "create": "L'utilisateur existe déjà."
      });
    } else {
      new User(newUser).save(function (err, createdUser) {
        res.send({
          "create": "OK"
        });
      });
    }
  });

});

module.exports = router;