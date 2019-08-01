var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./models/User');

var app = express();


var db = mongoose.connect('mongodb://localhost:27017/mylib', function(err, response){
    if(err) console.log("there is error in connecting with mongodb");
    console.log("Connection has been added");
});


app.set('port', process.env.port || 3000);
	

app.use(bodyparser.json());

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
    next();
})

app.get('/', (req, res)=>{
    res.send("hello");
})
app.post('/login', (req, res) => {
    User.find({
        email : req.body.email,
        password : req.body.password
    }, function(err, user){
        if(err) throw err;
        if(user.length === 1){  
            return res.status(200).json({
                status: 'success',
                data: user
            })
        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'Login Failed'
            })
        }
         
    })
})

app.post('/register', (req, res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

    user.save((err, result) =>{
        if(err) throw err;
        return res.status(200).json({
            status: 'success',
            message: 'Successfully added new user'
        })
    })

})


app.listen(app.get('port'), function(err,response){
    console.log("Server is running pn port", app.get('port'));
});