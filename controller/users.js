//var mongoose = require("mongoose");
var User = require("../models/users").User;

module.exports = {
    userSave: function (req, res) {
        console.log(req.query["first name"]);
        var user = new User({
            first_name: req.query["first name"]
        });
        user.save(function (err) {
            if (err) console.log('Error on save!')
                else{
                    console.log('success...');
                    res.send({"text": "success..."});
                }
        });
    }
}