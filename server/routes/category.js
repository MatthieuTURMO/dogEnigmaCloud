const express = require('express');
const router = express.Router();
var Category = require('../models/Category');

//envoie de toutes les catégories existantes dans la bdd
router.get('/', function (req, res) {
  console.log('GET CATEGORY');
  Category.find({}, function (err, categories) {
    res.send(categories);
  });
});

router.post('/', function (req, res) {
  console.log('POST CATEGORY');
  var newCat = req.body.category;
  Category.findOne({
    name: newCat.name
  }, function (err, existingCategory) {
    if (err) {
      res.status(500);
      res.send(err);
      throw err;
    }
    if (existingCategory) {
      res.status(400);
      res.send({
        "message": "La catégorie existe déjà"
      });
    } else {
      new Category(newCat).save(function (err, createdCat) {
        res.send({
          "message": "OK"
        });
      });
    }
  });
});

router.put('/:id', function (req, res) {
  var catId = req.params.id;
  var newCat = req.body.category;
  Category.findOne({
    _id: catId
  }, function (err, category) {
    if (err) {
      res.status(500);
      res.send(err);
      throw err;
    }
    if (category) {
      if (newCat.name !== "") {
        category.name = newCat.name;
      }
      if (newCat.description !== "") {
        category.description = newCat.description;i
      }
      category.save(function (err, createdCat) {
        res.send({
          "message": "OK"
        });
      });
    } else {
      res.status(404);
      res.send({
        "message": "La catégorie n'existe pas."
      });
    }
  });
});

router.delete('/:id', function (req, res) {
  var catId = req.params.id;
  Category.findOne({
    _id: catId
  }, function (err, category) {
    if (err) {
      res.status(500);
      res.send(err);
      throw err;
    }
    if (category) {
      category.remove();
      res.send({
        "message": "OK"
      });
    } else {
      res.status(404);
      res.send({
        "message": "La catégorie n'existe pas."
      });
    }
  })
});

module.exports = router;
