const express = require('express');
const router = express.Router();
var Library = require('../models/Library');
var Ebook = require('../models/Ebook');
var User = require('../models/User');

router.get('/', function (req, res) {
  Ebook.find({}, function (err, ebooks) {
    if (err) {
      res.send(500, err);
      throw err;
    } else {
      res.send(ebooks);
    }
  });
});

router.post('/', function (req, res) {
  var newEbook = req.body.ebook;
  var currentUser = req.session.user;
  newEbook.added_by = currentUser;
  new Ebook(newEbook).save(function (err, newEbook) {
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

router.put('/:id', function (req, res) {
  var ebookId = req.params.id;
  var newEbook = req.body.ebook;
  Ebook.findByIdAndUpdate(ebookId, newEbook, {
    upsert: true
  }, function (err, ebook) {
    if (err) {
      res.send(500, {
        error: err
      });
    }
    if (ebook) {
      return res.send({
        "message": "OK"
      });
    } else {
      return res.send(404, {
        "message": "L'ebook n'existe pas."
      });
    }
  });
});

router.delete('/:id', function (req, res) {
  var ebookId = req.params.id;
  Ebook.findById(ebookId, function (err, ebook) {
    if (err) {
      res.send(500, err);
      throw err;
    }
    if (ebook) {
        ebook.remove();
      res.send({
        "message": "OK"
      });
    } else {
      res.status(404);
      res.send({
        "message": "Cet ebook n'existe pas"
      });
    }
  });
});

module.exports = router;
