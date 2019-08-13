var express = require("express");
var app = express();
var request = require("request")
var mongoose = require("mongoose");
var idmodel = require("./models/ID")
var user = require("./models/user")
var review = require("./models/review")
var passport = require("passport")
var localStrategy = require("passport-local")
var bodyParser = require("body-parser")

mongoose.connect('mongodb://localhost:27017/imdbApp_v4', { useNewUrlParser: true });

app.use(require("express-session")({
    secret: "i want to get laid",
    resave: false,
    saveUninitialized: false
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.set("view engine", "ejs");
app.use(express.static('public'))

app.get("/", function (req, res) {
    request("https://api.themoviedb.org/3/movie/now_playing?api_key=f87808dca030deeb9f8c0b0389f1278a&language=en-US&page=1", function (err, response, body) {
        if (!err && response.statusCode === 200) {
            var parsedData = JSON.parse(body);
            res.render("index1", { movies: parsedData })
        }
    })
})

app.get("/imdb", function (req, res) {
    var search = req.query.search;
    if (search) {
        request("https://api.themoviedb.org/3/search/movie?api_key=f87808dca030deeb9f8c0b0389f1278a&language=en-US&query=" + search + "&page=1", function (err, response, body) {
            if (!err && response.statusCode === 200) {
                var parsedData = JSON.parse(body);
                res.render("index", { imdb: parsedData })
            }
        })
    }
})

app.get("/create/:name", function (req, res) {
    idmodel.findOne({ nameStr: req.params.name }, function (err, found) {
        // console.log(found)
        if (!found) {
            request("https://api.themoviedb.org/3/search/movie?api_key=f87808dca030deeb9f8c0b0389f1278a&language=en-US&query=" + req.params.name + "&page=1", function (err, response, body) {
                var parsedData = JSON.parse(body);
                idmodel.create({ id: parsedData.results[0] }, function (err, created) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        created.nameStr = created.id.original_title;
                        created.save();
                        res.redirect("/imdb/" + created._id)
                    }
                })
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
            res.render("show", { movie: found })
        }
    })
})
app.get("/imdb/:id/comment", function (req, res) {
    idmodel.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("comment", { movie: found })
        }
    })
})
app.post("/imdb/:id/comment", function (req, res) {
    idmodel.findById(req.params.id, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            review.create({ comment: req.body.comment, rating: req.body.rating }, function (err, created) {
                if (err) {
                    console.log(err)
                }
                else {
                    created.author = req.user._id;
                    created.save();
                    found.rating.push(created._id);
                    found.save();
                    console.log(found)
                }
            })
            res.render("comment", { movie: found })
        }
    })
})
app.get("/register", function (req, res) {
    res.render("register")
})

app.post("/register", function (req, res) {
    user.register(new user({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/")
            })
        }
    })
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {
})

app.get("/logout", function (req, res) {
    delete req._passport.session.user;
    res.redirect("/")
})
app.listen(5000, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server has started")
    }
})
