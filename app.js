var express = require("express");
var app = express();
var request = require("request")

app.set("view engine", "ejs");
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.render("index1");
})

app.get("/imdb", function (req, res) {
    var search = req.query.search;
    if (search) {
        request("http://www.omdbapi.com/?s=" + search + "&apikey=5e74b332", function (err, response, body) {
            if (!err && response.statusCode === 200) {
                var parsedData = JSON.parse(body);
                res.render("index", { imdb: parsedData })
            }
        })
    }
})


app.get("/show", function (req, res) {
    res.send("This is the show route")
})

app.listen(5000, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server has started")
    }
})
