var express = require('express');
var callback = require('./modules/Modules');
const app = express();

const REST_PORT = (process.env.PORT || 3000);
//app.use(bodyParser.json());

app.listen(REST_PORT, function() {
    console.log('Chatfuel Bot-Server listening on port ' + REST_PORT);
});

app.get("/playMeditation", function (request, response){
     response.sendFile(__dirname+"/html/play.html");
 });

app.get('/nutrition', callback.nutritionTipsCB);

app.get('/motivation', callback.motivationTipsCB);

app.get('/yogaTips', callback.yogaTipsCB);

app.get('/user/*', function(req, res) {
    //var jsonResponse = [];
    //var correctRequest = decodeURIComponent((req.query).replace(/\+/g, ''));
    //console.log(req.query["messenger user id"]);
    console.log(req.params['0']);
    //console.log(req.query)
    
});