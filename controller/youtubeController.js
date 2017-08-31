module.exports = require("../libs/youtube").Youtube;
const YoutubeAPI = require(__dirname + '/youtubeController');
const config = require('../config/main');
const YOUTUBE_ACCESS_TOKEN = config.YOUTUBE_ACCESS_TOKEN;

const redis = require('redis');
const REDIS_PORT = config.REDIS_PORT;
const REDIS_HOST = config.REDIS_HOST;

const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on('connect', function(){
    console.log('Connected to Redis');
});

var api = new YoutubeAPI(YOUTUBE_ACCESS_TOKEN);

const imageUrl = "https://s19.postimg.org/y6pd8dn4j/No_image_available.png";
//const youtubeURL = "https://www.youtube.com/embed/";
const youtubeURL = "https://www.youtube.com/watch?v=";
const frameURL = "https://sheltered-dawn-53620.herokuapp.com/youtubeVideo/";
//const frameURL = "https://sheltered-dawn-53620.herokuapp.com/youtubeVideo/";

module.exports = {
    youtubeController: function (request, response) {
        console.log(request);
        if (request.query.q) {
            try {
                let options = {
                    search: request.query.q + " " + request.query['gender'], // user query received in request
                    part: "snippet",
                    order: request.query.order || "rating", // if user provides order set the value else set as viewcount
                    type: request.query.type || "video",
                    videoDefinition: request.query.videoDefinition || "high",
                    videoType: "any",
                    maxResults: request.query.maxResults || 5
                };
                //*********************function to search the video on youtube - START ***************************
                api.getVideoSearch(options, (err, res) => {
                    if (err) {
                        console.log("error received in search API...")
                    } else {
                        let videoData = JSON.parse(res.body) || {};
                        console.log(videoData); //comment this console log
                        loopVideos(videoData, (elementsData) => {
                            //facebook messenger gallery template...
                            let messageData = [{
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "generic",
                                        "elements": elementsData
                                    }
                                }
                            }];
                            if (elementsData[0]) {
                                console.log("sending videos...");
                                client.setex(request.query.q, 7200, JSON.stringify(messageData));
                                response.send(messageData);
                            } else {
                                response.send([{"text": "We are experiencing high load, please try again a bit later. Thank you!"}]);
                            }
                            //console.log("messageData = " + JSON.stringify(messageData)); //comment this console log
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
            //*********************function to search the video on youtube - END ***************************
        } else {
            response.send(messageData || [{
                "text": "Please send the search query for video search..."
            }]);
        }
    },
    cache: function (req, res, next) {
        const query = req.query.q;
        client.get(query, function (err, data) {
            if (err) throw err;
            if (data != null) {
                console.log("REDIS responded to query: " + query);
                res.send(data);
            } else {
                next();
            }
        });
    }
}

//******************* loop through all the data received from youtube API and convert to Facebook gallery format -  START ***********************
var loopVideos = function (videoData, done) {
    let elementsData = []; // elementsData is the JSON format array containing cards
    try {
        for (var i = 0; i < videoData.pageInfo.resultsPerPage; i++) {
            elementsData[i] = {
                "title": videoData.items[i].snippet.title,
                "image_url": videoData.items[i].snippet.thumbnails.high.url || imageUrl,
                "subtitle": videoData.items[i].snippet.description,
                "buttons": [{
                        "type": "web_url",
                        "url": frameURL + videoData.items[i].id.videoId,
                        "title": "Watch Youtube Video",
                        "webview_height_ratio": "compact"
                    },
                    {
                        "type": "element_share"
                    }
                ]
            }
        }
    } catch (err) {
        console.log(err); //comment this console log
    }
    console.log("elementsData = " + elementsData); //comment this console log
    return done(elementsData);
}
//******************* loop through all the data received from youtube API and convert to Facebook gallery format -  START ***********************