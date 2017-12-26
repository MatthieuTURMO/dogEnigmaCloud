var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    user_id: ObjectId,
    pseudo: {
        type: String,
        match: /^[a-zA-Z0-9-_]+$/
    },
    prenom: String,
    nom: String,
    password: String,
    email : String,
    droits: Number
});

// //génération d'un token aléatoire pour chaque nouvel utilisateur
// userSchema.method('randomToken', function(){
//     return Math.round((new Date().valueOf() * Math.random())) + '';
// });

// fonction de hashage du mot de passe avant persistence dans la base de données
userSchema.pre('save', function(next){
    var pw = passwordHash.generate(this.password);
    this.password = pw;
    next();
});

module.exports = mongoose.model('User', userSchema);