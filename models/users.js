var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({

    //fb_id: {type: String, index: { unique: true }},
    first_name: {type: String, required: true},
    // last_name: {type: String, required: true },
    // gender: { type: String, required: true},
    // yogaSub: {type: String},
    // meditationSub: {type: String},
    // exerciseSub: {type: String},
    // date_created: { type: Date, required: true, default: Date.now }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}