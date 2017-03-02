var path = require("path");
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index", { title: "Main Page", layout:"main-admin.hbs", condition: false});
    });
    app.get("/menu", function (req, res) {
        res.render("menu", { title: "Menu Page", layout:"main-admin.hbs", condition: false});
    });
    app.get("/reserve", function (req, res) {
        res.render("reserve", { title: "Reservation Page", layout:"main-admin.hbs", condition: false});
    });
    app.get("/events", function (req, res) {
        res.render("events"), { title: "Events Page", layout:"main-admin.hbs", condition: false};
    });
    app.get("/reviews", function (req, res) {
        res.render("reviews", { title: "Reviews Page", layout:"main-admin.hbs", condition: false});
    });
    app.get("/contact", function (req, res) {
        res.render("contact", { title: "Contact Page", layout:"main-admin.hbs", condition: true});
    });
    app.get("/api/get", function (req, res) {
        db.ResReq.findAll({}).then(function (data) {
            res.json(data);
        });
    });
    app.post("/api/create", function (req, res) {
        console.log(req.body);
        db.ResReq.create(
            req.body
        ).then(function (data) {
            res.json(data);
        })
    });
    // Listen for new user
    app.post("/api/newUser", function (req, res) {
        // user's email will be unique
        var checkEmail = req.body.email;
        // creating object to send to db
        var userObject = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            user_name: req.body.username,
            email: req.body.email
        };

        // check if the e-mail exists, add the user if no email
        db.users.findAll({
            where: {
                email: checkEmail
            }
        })
            .then(function (result) {
                if (result.length === 0) {
                    db.users.create(userObject).then(function (result) {
                        res.json("new user has been added");
                    });
                }
            });


    });
};
