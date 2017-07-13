var express = require('express');
var nutritionTips = require('./tips.json');
const app = express();

const REST_PORT = (process.env.PORT || 3000);
//app.use(bodyParser.json());

app.listen(REST_PORT, function() {
    console.log('Chatfuel Bot-Server listening on port ' + REST_PORT);
});

app.get('/nutrition', function(req, res) {
    var jsonResponse = [];
    //console.log(tip);
    var ran = Math.floor((Math.random() * 10));
    console.log(ran);
    jsonResponse.push({ "text": nutritionTips[ran].tip});
    console.log(nutritionTips[ran].tip);
    res.send(jsonResponse);
});