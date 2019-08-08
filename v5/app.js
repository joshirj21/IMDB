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
    idmodel.findOne({ idStr: req.params.id }, function (err, found) {
        // console.log(found)
        if (!found) {
            request("http://www.omdbapi.com/?i=" + req.params.id + "&apikey=5e74b332", function (err, response, body) {
                var parsedData = JSON.parse(body);
                idmodel.create({ id: parsedData }, function (err, created) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        created.idStr = created.id.imdbID;
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
