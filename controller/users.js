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
    },
    userUpdate: function (req, res){
        var query = {'_id' : req.query["messenger user id"]};
        var subscription;
        if(req.query.meditationSub){
            subscription = {'subscription.meditationSub' : req.query.meditationSub};
        }
        else if(req.query.yogaSub){
            subscription = {'subscription.yogaSub' : req.query.yogaSub};
        }
        else if (req.query.exerciseSub){
            subscription = {'subscription.exerciseSub' : req.query.exerciseSub};
        }
        else{
            console.log("invalid query found...");
        }
        console.log(subscription);
        User.findOneAndUpdate(query, subscription, function(err, doc){
            if (err) return res.send({ "text":"error updating..." });
            console.log('update success...');
             return res.send({
                "text": "success..."
            });
        });
    }
}