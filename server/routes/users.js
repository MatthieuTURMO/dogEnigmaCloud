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

router.get('/current', function (req, res) {
  console.log('CURRENT',req.session.user);
  User.findById(req.session.user._id, function (err, usr) {
    res.send(usr);
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
      newUser.privilege = 1;
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

router.delete('/:id', function (req, res) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) {
      res.send(500, err);
      throw err;
    }
    if (user) {
      user.remove();
      res.send({
        "message": "OK"
      });
    } else {
      res.status(404);
      res.send({
        "message": "Cet utilisateur n'existe pas"
      });
    }
  });
});



// router.all('*', function(req, res){
//   res.status(404);
//   res.send({
//     "message" : "Cette requête n'existe pas."
//   });
// });

module.exports = router;
