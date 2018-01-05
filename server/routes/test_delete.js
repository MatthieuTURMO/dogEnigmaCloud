const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const User = require('../models/User');
// router.get('/', (req, res) => {
//   User.find(function (err, users) {
//     res.send(users);
//   });
// });

router.get('/', (req, res) => {
  console.log('TEST/');
  new User({
    pseudo: 'zzz',
    password: 'ezez'
  }).save(function (err, newUsr) {
    res.send(newUsr);
  });
});

router.get('/testConnexion', (req, res) => {
  req.session.user = 'AAA';
  res.send({
    "pseudo": "test",
    "prenom": "nom"
  });
});


router.get('/testDeconnexion', (req, res) => {
  delete req.session.user;
  res.send('déconnexion');
});

router.get('/testPage', (req, res) => {
  if (req.session.user) {
    res.send('Connecté');
  } else {
    res.send('DÉCONNECTÉ');
  }
});




module.exports = router;
