var mongoose = require("mongoose")

var schema = new mongoose.Schema({
    comment: String,
    rating: String,
    wishlist: Boolean,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model("review", schema);