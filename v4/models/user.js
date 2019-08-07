var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose")

var user = mongoose.Schema({
    username: String,
    password: String
})

user.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", user)