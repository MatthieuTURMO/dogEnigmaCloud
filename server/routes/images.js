const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/:name', (req, res) => {
  console.log('IMAGES/');
  var imageName = req.params.name;
  res.sendFile(path.join(__dirname, '../../public/'+imageName));
});

module.exports = router;
