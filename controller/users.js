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
            subscription: {
                yogaSub: "N",
                meditationSub: "N",
                exerciseSub: "N",
            },
            date_created: Date.now()
        });
        user.save(function (err) {
            if (err) {
                console.log('Error on save!')
                res.send([{
                    "text": ""
                }]);
            } else {
                console.log('success...');
                res.send({
                    "text": "success..."
                });
            }
        });
    }
}