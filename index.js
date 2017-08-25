var express = require('express');
var callback = require('./modules/Modules');
var user = require('./controller/users');
var mongoose = require ("mongoose");
var youtube = require("./controller/youtubeController");
const app = express();

const REST_PORT = (process.env.PORT || 3000);
var uristring = 
  process.env.MONGODB_URI;

app.use(bodyParser.json());

mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.get("/playMeditation", function (request, response){
     response.sendFile(__dirname+"/html/play.html");
 });

app.get('/nutrition', callback.nutritionTipsCB);

app.get('/motivation', callback.motivationTipsCB);

app.get('/yogaTips', callback.yogaTipsCB);

app.get('/user', user.userSave);

app.get('/videoChannel', youtube.youtubeController);

app.listen(REST_PORT, function() {
    console.log('Bot-Server listening on port ' + REST_PORT);
});

