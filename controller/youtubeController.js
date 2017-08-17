module.exports = require("../libs/youtube").Youtube;
var YoutubeAPI = require(__dirname + '/youtubeController');
var YOUTUBE_ACCESS_TOKEN = "AIzaSyDONFWCY6lo0xnejz3xC8Dj1Zn9ede7e-g";
var api = new YoutubeAPI(YOUTUBE_ACCESS_TOKEN);
var imageUrl = "https://s19.postimg.org/y6pd8dn4j/No_image_available.png";

var youtubeURL = "https://www.youtube.com/watch?v=";

module.exports = {
    youtubeController: function (request, response) {
        console.log(request.query.param);
        if (request.query.param == "abs") {
            let options = {
                search: "abs+workout"
            };
            api.getVideoSearch(options, (err, res) => {
                if (err) {
                    console.log("error received in abs search API...")
                } else {
                    let parsedJSON = JSON.parse(res.body) || {};
                    //console.log(parsedJSON);
                    let videoData = parsedJSON;
                    let elementsData = [];
                    loopVideos(videoData, elementsData, (elementsData) => {
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
                        console.log("messageData = " + JSON.stringify(messageData));
                    });
                }
            });
        }
    }
}

var loopVideos = function (videoData, elementsData, done) {
    for (var i = 0; i < 5; i++) {
        elementsData[i] = {
            "title": videoData.items[i].snippet.title,
            "imageUrl": videoData.items[i].snippet.thumbnails.medium.url || imageUrl,
            "subtitle": videoData.items[i].snippet.description,
            "buttons": [{
                    "type": "web_url",
                    "url": youtubeURL + videoData.items[i].id.videoId,
                    "title": "Watch Video"
                },
                {
                    "type": "show_block",
                    "block_names": ["Default answer"],
                    "title": "Menu"
                }
            ]
        }
    }
    console.log("elementsData = " + elementsData);
    return done(elementsData);
}