var nutritionTips = require('../tips.json');
var yogaTips = require('../yogaTips.json');
var motivation = require('../motivateURL.json');

module.exports = {
    nutritionTipsCB: function (req, res) {
        var jsonResponse = [];
        //console.log(tip);
        var ran = Math.floor((Math.random() * nutritionTips.length));
        console.log(ran);
        jsonResponse.push({
            "text": nutritionTips[ran].tip,
            "quick_replies": [{
                    "title": "Main Menu",
                    "block_names": ["Default answer"]
                },
                {
                    "title": "More",
                    "block_names": ["Nutrition"]
                }
            ]
        });
        console.log(nutritionTips[ran].tip);
        res.send(jsonResponse);
    },
    motivationTipsCB: function (req, res) {
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
            "quick_replies": [{
                    "title": "Main Menu",
                    "block_names": ["Default answer"]
                },
                {
                    "title": "More",
                    "block_names": ["Motivate me"]
                }
            ]
        });
        console.log(motivation[ran].url);
        res.send(jsonResponse);
    },
    yogaTipsCB: function (req, res) {
        var jsonResponse = [];
        var ran = Math.floor((Math.random() * yogaTips.length));
        jsonResponse.push({
            "attachment": {
                "type": "image",
                "payload": {
                    "url": yogaTips[ran].url
                }
            },
            "quick_replies": [{
                    "title": "Main Menu",
                    "block_names": ["Default answer"]
                },
                {
                    "title": "More",
                    "block_names": ["Yoga"]
                }
            ]
        });
        console.log(yogaTips[ran].url);
        res.send(jsonResponse);
    }
}