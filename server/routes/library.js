const express = require('express');
const router = express.Router();
var Library = require('../models/Library');
var User = require('../models/User');

router.get('/', function (req, res) {
  Library.find({}, function (err, libraries) {
    if (err) {
      res.send(500, err);
      throw err;
    } else {
      res.send(libraries);
    }
  });
});

//ajoute une nouvelle library à l'utilisateur courant
router.post('/', function (req, res) {
  var newLibrary = req.body.library;
  var currentUser = req.session.user;
  User.findById(currentUser._id).populate('libraries').exec(function (err, user) {
    var found = false;
    user.libraries.forEach(lib => {
      if (newLibrary.name === lib.name) {
        //la library existe déjà
        res.status(500);
        res.send({
          "message": "Vous avez déjà une librairie portant ce nom."
        });
        found = true;
      }
    });
    if (!found) {
      new Library(newLibrary).save(function (err, newLib) {
        user.libraries.push(newLib._id);
        user.save(function (err, usr) {
          if (err) {
            res.send(500, err);
            throw err;
          } else {
            res.send({
              "message": "OK"
            });
          }
        });
      });
    }
  });
});

//modification d'une librairie
router.put('/:id', function (req, res) {
  var newLibrary = req.body.library;
  var libId = req.params.id;
  Library.findOneAndUpdate({
      _id: libId
    },
    newLibrary, {
      upsert: true
    },
    function (err, library) {
      if (err) return res.send(500, {
        error: err
      });
      if (library) {
        return res.send({
          "message": "OK"
        });
      } else {
        return res.send(404, {
          "message": "La librairie n'existe pas."
        });
      }
    })
});

router.delete('/:id', function (req, res) {
  var libId = req.params.id;
  //une librairie appartient à 1 et 1 seul utilisateur, on lui retire 
  //alors cette librairie
  Library.findById(libId, function (err, lib) {
    if (err) {
      res.send(500, err);
      throw err;
    }
    if (lib) {
      lib.remove();
      res.send({
        "message": "OK"
      });
    } else {
      res.status(404);
      res.send({
        "message": "Cette librairie n'existe pas"
      });
    }
  });
});

module.exports = router;
