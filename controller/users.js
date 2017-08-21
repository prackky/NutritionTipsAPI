//var mongoose = require("mongoose");
var User = require("../models/users").User;

module.exports = {
    userSave: function (req, res) {
        console.log(req.query);
        var user = new User({
            _id: req.query["messenger user id"],
            first_name: req.query["first name"],
            last_name: req.query["last name"],
            gender: req.query["gender"],
            yogaSub: "N",
            meditationSub: "N",
            exerciseSub: "N",
            //date_created: Date.now
            //profile_pic: req.query["profile pic url"],
            //locale: req.query["locale"]
        });
        user.save(function (err) {
            if (err) {console.log('Error on save!')
            res.send({
                    "text": "already exists..."
                });
            }
            else {
                console.log('success...');
                res.send({
                    "text": "success..."
                });
            }
        });
    }
}