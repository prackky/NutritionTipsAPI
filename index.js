var express = require('express');
var nutritionTips = require('./tips.json');
var yogaTips = require('./yogaTips.json');
var motivation = require('./motivateURL.json');
const app = express();

const REST_PORT = (process.env.PORT || 3000);
//app.use(bodyParser.json());

app.listen(REST_PORT, function() {
    console.log('Chatfuel Bot-Server listening on port ' + REST_PORT);
});

app.get("/playMeditation", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/html/play.html");
 });

app.get('/nutrition', function(req, res) {
    var jsonResponse = [];
    //console.log(tip);
    var ran = Math.floor((Math.random() * nutritionTips.length));
    console.log(ran);
    jsonResponse.push({
      "text": nutritionTips[ran].tip,
      "quick_replies": [
          {
          "title":"Main Menu",
          "block_names":["Default answer"]
        },
        {
          "title":"More",
          "block_names":["Nutrition"]
        }
      ]
});
    console.log(nutritionTips[ran].tip);
    res.send(jsonResponse);
});

app.get('/motivation', function(req, res) {
    var jsonResponse = [];
    //console.log(tip);
    var ran = Math.floor((Math.random() * motivation.length));
    console.log(motivation.length);
    console.log(ran);
    jsonResponse.push({
      "attachment": {
        "type": "image",
        "payload": {
          "url": motivation[ran].url
        }
      },
      "quick_replies": [
          {
          "title":"Main Menu",
          "block_names":["Default answer"]
        },
        {
          "title":"More",
          "block_names":["Motivate me"]
        }
      ]}
      );
    console.log(motivation[ran].url);
    res.send(jsonResponse);
});

app.get('/yogaTips', function(req, res) {
    var jsonResponse = [];
    //console.log(tip);
    var ran = Math.floor((Math.random() * yogaTips.length));
    //console.log(yogaTips.length);
    //console.log(ran);
    jsonResponse.push({
      "attachment": {
        "type": "image",
        "payload": {
          "url": yogaTips[ran].url
        }
      },
      "quick_replies": [
          {
          "title":"Main Menu",
          "block_names":["Default answer"]
        },
        {
          "title":"More",
          "block_names":["Yoga"]
        }
      ]}
      );
    console.log(yogaTips[ran].url);
    res.send(jsonResponse);
});

app.get('/user', function(req, res) {
    //var jsonResponse = [];
    console.log(req.OriginalUrl);
    
});