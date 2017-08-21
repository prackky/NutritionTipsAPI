var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({

    _id: {type: Number, required: true, index:{unique: true}},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true },
    gender: { type: String, required: true},
    yogaSub: {type: String, default: "N"},
    meditationSub: {type: String, default: "N"},
    exerciseSub: {type: String, default: "N"},
    date_created: { type: Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}