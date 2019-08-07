var mongoose = require("mongoose")

var schema = new mongoose.Schema({
    id: {},                         //storing imdb object
    idStr: String,                   //String imdbID to avoid creating same id again
})

module.exports = mongoose.model("ID", schema);