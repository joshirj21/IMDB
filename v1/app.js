var express = require("express");
var app = express();
var request = require("request")
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/imdbApp', { useNewUrlParser: true });

var schema = new mongoose.Schema({
    id: String
})

var idmodel = mongoose.model("ID", schema);

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

app.get("/create/:id", function (req, res) {
    idmodel.findOne({ id: req.params.id }, function (err, found) {
        if (!found) {
            idmodel.create({ id: req.params.id }, function (err, created) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.redirect("/imdb/" + created._id)
                }
            })
        }
        else {
            res.redirect("/imdb/" + found._id)
        }
    })
})

app.get("/imdb/:id", function (req, res) {
    idmodel.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.send("This is the show route")
        }
    })
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
