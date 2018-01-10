const express = require('express');
const router = express.Router();
var Comment = require('../models/Comment');
var Ebook = require('../models/Ebook');
var sendError = require('../services/error').sendError;

router.get('/', function (req, res) {
  Comment.find({}).populate('author', {
    password: 0,
    __v: 0
  }).exec(function (err, users) {
    if (err) {
      res.status(500);
      res.send(err);
      throw err;
    } else {
      res.send(users);
    }
  })
});

//ajout d'un commmentaire au pif pour les tests
router.post('/', function (req, res) {
  var newComment = req.body.comment;
  new Comment(newComment).save(function (err, createdComment) {
    res.send({
      "message": "OK"
    });
  });
});

//ajout d'un commentaire et affectation à un ebook
router.post('/:id', function (req, res) {
  var ebookId = req.params.id;
  var newComment = req.body.comment;
  newComment.author = req.session.user;
  Ebook.findById(ebookId, function (err, ebook) {
    if (err) {
      res.end(500, err);
      throw err;
    }
    if (!ebook) {
      res.status(404);
      res.send({
        "message": "Cet ebook n'existe pas"
      });
    } else {
      new Comment(newComment).save(function (err, comment) {
        sendError(res, err);
        ebook.comments.push(comment._id);
        ebook.save(function (err, newEbook) {
          sendError(res, err);
          res.send({
            "message": "OK"
          });
        });
      });
    }
  });
});


router.put('/:id', function (req, res) {
  var newComment = req.body.comment;
  var commentId = req.params.id;
  Comment.findOneAndUpdate({
      _id: commentId
    },
    newComment, {
      upsert: true
    },
    function (err, comment) {
      if (err) return res.send(500, {
        error: err
      });
      if (comment) {
        return res.send({
          "message": "OK"
        });
      } else {
        return res.send(404, {
          "message": "Le commentaire n'existe pas."
        });
      }
    });
});

router.delete('/:id', function (req, res) {
  var commentId = req.params.id;
  Comment.findById(commentid, function (err, comment) {
    if (err) {
      res.end(500, err);
      throw err;
    } else if (!comment) {
      res.status(404);
      res.send({
        "message": "Ce commentaire n'existe pas"
      });
    } else {
      comment.remove();
      res.send({
        "message": "OK"
      });
    }
  });
});

module.exports = router;
