// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var fs = require('fs')
var https = require('https')
var app      = express();
var port     = process.env.PORT || 81;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var Schema   = mongoose.Schema;
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
ObjectID = require('mongodb').ObjectID;

var configDB = require('./config/database.js');

//var mymodule = require('./public/scripts/mymodule.js'),

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({
    secret: 'myweathermagic', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

//MongoDB connection URL - mongodb://host:port/dbName

mongoose.model('Temperatura',
               new Schema({ time: Number, temp: Number}),
               'col');

var mymodule = require('./public/scripts/mymodule')

var Time = [];
var Temperature = [];
var Grafico = [];

getData = function(responseObj){
  //use the find() API and pass an empty query object to retrieve all records

        var dados = mongoose.model('Temperatura');

        dados.find({}, function(err, data)
        {
                if(err){
                        console.log(err, data, data.length);
                }else{
                  //console.log(data);
                }



                for ( index in data){

                  var doc = data[index];
                  var objectId = new ObjectID(doc['_id'])
                  var time = objectId.getTimestamp();
                  var temperature = doc['temp'];

                  Temperature.push(temperature);
                  Time.push(time);

                  }

        response = {
          "x" : Temperature,
          "y" : Time
        };
        responseObj.json(response);
        }).sort('-date').limit(50);
        
  }


app.get("/dados", function(req, res){
          var data;
          getData(data);
          //res.render('grafico.ejs',{val: Temperature},{ message: req.flash('loginMessage') });
});

/*app.get("/dados", function(req, res){
  getData(res);
  res.re
});*/

app.listen(81);

