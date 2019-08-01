var mongooes = require('mongoose');
var userSchema = mongooes.Schema({
    firstname: {type:String, require:true},
    lastname: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
})


var User = module.exports = mongooes.model('User', userSchema);