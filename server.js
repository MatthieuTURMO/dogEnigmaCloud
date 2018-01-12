// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');
const usersApi = require('./server/routes/users');
const uploadApi = require('./server/routes/upload');
const categoryApi = require('./server/routes/category');
const commentApi = require('./server/routes/comment');
const libraryApi = require('./server/routes/library');
const ebookApi = require('./server/routes/ebook');
const images = require('./server/routes/images');

var printPath = require('./server/services/printPath').printPath;

const app = express();

//mise en place de la session pour chaque client
var session = require('client-sessions');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  cookieName: 'session',
  secret: 'larnohechelefbucheleftemhechelbuchelef89',
  duration: 12 * 60 * 60 * 1000,
  activeDuration: 1 * 60 * 60 * 1000,
}));


//connexion à la base de données mongodb et enregistrement des schémas
var mongoose = require('mongoose');
//définition et enregistrement des modèles de la database
mongoose.connect('mongodb://localhost/db_projet_nodejs', {
  useMongoClient: true
}, function (err) {
  if (err) {
    console.log("Connexion à la bdd échouée");
    throw err;
  } else {
    console.log("Connexion à la bdd réussie");
  }
});

// Parsers for POST data
app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Gestion des CORS, temporaire pour le développement
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//public folder (upload files)
app.use(express.static(path.join(__dirname, 'public')));

app.use(printPath);

// Set our api routes
app.use('/api', api);
app.use('/api/users', usersApi);
app.use('/api/upload', uploadApi);
app.use('/api/category', categoryApi);
app.use('/api/comment', commentApi);
app.use('/api/library', libraryApi);
app.use('/api/ebook', ebookApi);
app.use('/api/public/images', images);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
