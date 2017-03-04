var path = require("path");
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {
    // MAIN ROUTES
    app.get("/", function (req, res) {
        res.render("index", { title: "Main Page", layout: "main.hbs", condition: false });
    });
    app.get("/about", function (req, res) {
        res.render("about", { title: "About Page", layout: "main.hbs", condition: false });
    });
    app.get("/contact", function (req, res) {
        res.render("contact", { title: "Contact Page", layout: "main.hbs", condition: false });
    });

    // SELECT ROUTES
    app.get("/select", function (req, res) {
        res.render("index-select", { title: "Admin Selection Page", layout: "main-select.hbs", condition: false });
    });

    // ADMIN ROUTES
    app.get("/admin/menu", function (req, res) {
        res.render("menu-admin", { title: "Admin Menu Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/admin/reserve", function (req, res) {
        res.render("reserve-admin", { title: "Admin Reservation Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/admin/events", function (req, res) {
        res.render("events-admin"), { title: "Admin Events Page", layout: "main-admin.hbs", condition: false };
    });
    app.get("/admin/reviews", function (req, res) {
        res.render("reviews-admin", { title: "Admin Reviews Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/admin/contact", function (req, res) {
        res.render("contact-admin", { title: "Admin Contact Page", layout: "main-admin.hbs", condition: true });
    });

    // API ROUTES
    app.get("/api/get", function (req, res) {
        db.restaurants.findAll({}).then(function (data) {
            res.json(data);
        });
    });
    app.post("/api/create", function (req, res) {
        console.log(req.body);
        db.restaurants.create(
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

            })
            .then(function (result) {
                res.render("index-select", { title: "Admin Selection Page", layout: "main-select.hbs", condition: false });
            });


    });
};
