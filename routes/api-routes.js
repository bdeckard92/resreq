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
    app.get("/:id/select", function (req, res) {
        res.render("select-index", { title: "Restaurant Selection Page", layout: "main-select.hbs", condition: false });
    });

    // ADMIN ROUTES
    app.get("/:id", function (req, res) {
        res.render("admin-index", { title: "Admin Main Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/:id/menu", function (req, res) {
        res.render("admin-menu", { title: "Admin Menu Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/:id/reserve", function (req, res) {
        res.render("admin-reserve", { title: "Admin Reservation Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/:id/event", function (req, res) {
        res.render("admin-event"), { title: "Admin Events Page", layout: "main-admin.hbs", condition: false };
    });
    app.get("/:id/review", function (req, res) {
        res.render("admin-review", { title: "Admin Reviews Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/:id/contact", function (req, res) {
        res.render("admin-contact", { title: "Admin Contact Page", layout: "main-admin.hbs", condition: true });
    });

    // API ROUTES
    app.get("/api/get/:userId", function (req, res) {
        var userId = req.params.userId;
        db.restaurants.findAll({
            include: [db.users],
            where: {
                userId: userId
            }
        }).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/user/:user_email", function (req, res) {
        var email = req.params.user_email;
        db.users.findAll({
            where: {
                email: email
            },
        }).then(function (data) {
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
            // include: [db.users],
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
                else{
                    res.json(result);
                }

            });
    });
};
