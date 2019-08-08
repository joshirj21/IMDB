var mongoose = require("mongoose")

var schema = new mongoose.Schema({
    id: {},                         //storing imdb object
    idStr: String,                   //String imdbID to avoid creating same id again
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review"
    }]
})

module.exports = mongoose.model("ID", schema);