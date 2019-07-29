var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("This is the landing page");
})

app.listen(3000, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server has started")
    }
})
