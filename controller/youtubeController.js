module.exports = require("../libs/youtube").Youtube;
var YoutubeAPI = require(__dirname + '/youtubeController');
const YOUTUBE_ACCESS_TOKEN = "AIzaSyDONFWCY6lo0xnejz3xC8Dj1Zn9ede7e-g";
//var YOUTUBE_ACCESS_TOKEN = process.env.YOUTUBE_ACCESS_TOKEN;

var api = new YoutubeAPI(YOUTUBE_ACCESS_TOKEN);

var imageUrl = "https://s19.postimg.org/y6pd8dn4j/No_image_available.png";
const youtubeURL = "https://www.youtube.com/embed/";
//var youtubeURL = "https://www.youtube.com/watch?v=";
const frameURL = "https://3c40d222.ngrok.io/youtubeVideo/";
//const frameURL = "https://sheltered-dawn-53620.herokuapp.com/youtubeVideo/";

module.exports = {
    youtubeController: function (request, response) {
        //console.log(request);
        if (request.query.q) {
            try {
                let options = {
                    search: request.query.q, // user query received in request
                    part: "snippet",
                    order: request.query.order || "relevance", // if user provides order set the value else set as viewcount
                    type: request.query.type || "video",
                    videoDefinition: request.query.videoDefinition || "any",
                    videoType: "any",
                    maxResults: request.query.maxResults || 5
                };
                //*********************function to search the video on youtube - START ***************************
                api.getVideoSearch(options, (err, res) => {
                    if (err) {
                        console.log("error received in abs search API...")
                    } else {
                        let videoData = JSON.parse(res.body) || {};
                        console.log(videoData); //comment this console log
                        loopVideos(videoData, (elementsData) => {
                            //facebook messenger gallery template...
                            var messageData = [{
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "generic",
                                        "elements": elementsData
                                    }
                                }
                            }];
                            response.send(messageData || [{
                                "text": "Sorry, video service is not available right now..."
                            }]);
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
    }
}

//******************* loop through all the data received from youtube API and convert to Facebook gallery format -  START ***********************
var loopVideos = function (videoData, done) {
    let elementsData = []; // elementsData is the JSON format array containing cards
    try {
        for (var i = 0; i < videoData.pageInfo.resultsPerPage ; i++) {
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
                    "type":"element_share"
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