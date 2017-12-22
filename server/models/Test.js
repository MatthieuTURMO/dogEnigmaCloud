var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var testSchema = new Schema({
    user_id: ObjectId,
    pseudo: {
        type: String,
        match: /^[a-zA-Z0-9-_]+$/
    },
    prenom: String,
    nom: String,
    password: String,
    token : String,
    droits: Number
});

// //génération d'un token aléatoire pour chaque nouvel utilisateur
// userSchema.method('randomToken', function(){
//     return Math.round((new Date().valueOf() * Math.random())) + '';
// });

// //mise en place du token en fonction de l'utilisateur
// userSchema.pre('save', function(next){
//     this.token = this.randomToken();
//     next();
// });

module.exports = mongoose.model('Test', testSchema);