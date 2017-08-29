var express = require('express');
var callback = require('./modules/Modules');
var user = require('./controller/users');
var mongoose = require("mongoose");
var youtube = require("./controller/youtubeController");
const app = express();
const config = require('./config/main');

const REST_PORT = config.port;
var uristring = config.database;

app.set('view engine', 'pug')

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

app.get("/playMeditation", function (request, response) {
  response.sendFile(__dirname + "/html/index.html");
});

app.get('/nutrition', callback.nutritionTipsCB);

app.get('/motivation', callback.motivationTipsCB);

app.get('/yogaTips', callback.yogaTipsCB);

app.get('/youtubeVideo/*', function (req, res) {
  console.log(req.params['0']);
  res.render('index', {
    title: 'Video',
    source: req.params['0']
  })
})

app.get('/user', user.userSave);

app.get('/videoChannel', youtube.cache, youtube.youtubeController);

app.listen(REST_PORT, function () {
  console.log('Bot-Server listening on port ' + REST_PORT);
});