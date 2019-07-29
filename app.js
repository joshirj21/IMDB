var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.redirect("/imdb");
})

app.get("/imdb", function (req, res) {
    res.send("This is the landing page")
})

app.get("/show", function (req, res) {
    res.send("This is the show route")
})

app.listen(3000, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server has started")
    }
})
