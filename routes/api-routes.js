var path = require("path");
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {
    // MAIN ROUTES
    app.get("/", function (req, res) {
        res.render("index", {
            title: "Main Page",
            layout: "main.hbs",
            condition: false
        });
    });
    app.get("/about", function (req, res) {
        res.render("about", {
            title: "About Page",
            layout: "main.hbs",
            condition: false
        });
    });
    app.get("/contact", function (req, res) {
        res.render("contact", {
            title: "Contact Page",
            layout: "main.hbs",
            condition: false
        });
    });

    // SELECT ROUTES
    app.get("/select", function (req, res) {
        res.render("index-select", {
            title: "Admin Selection Page",
            layout: "main-select.hbs",
            condition: false
        });
    });

    // ADMIN ROUTES
    app.get("/admin/menu", function (req, res) {
        res.render("menu-admin", {
            title: "Admin Menu Page",
            layout: "main-admin.hbs",
            condition: false
        });
    });
    app.get("/admin/reserve", function (req, res) {
        res.render("reserve-admin", {
            title: "Admin Reservation Page",
            layout: "main-admin.hbs",
            condition: false
        });
    });
    app.get("/admin/events", function (req, res) {
        res.render("events-admin"), {
            title: "Admin Events Page",
            layout: "main-admin.hbs",
            condition: false
        };
    });
    app.get("/admin/reviews", function (req, res) {
        res.render("reviews-admin", {
            title: "Admin Reviews Page",
            layout: "main-admin.hbs",
            condition: false
        });
    });
    app.get("/admin/contact", function (req, res) {
        res.render("contact-admin", {
            title: "Admin Contact Page",
            layout: "main-admin.hbs",
            condition: true
        });
    });

    // API ROUTES
    app.get("/api/get", function (req, res) {
        db.restaurants.findAll({
            include: [db.users]
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

    // add new event to calendar
    app.post("/api/newEvent", function(req, res){
    var eventObject = {
      title: req.body.title,
      event_url: req.body.event_url,
      event_start_time: req.body.event_start_time,
      event_end_time: req.body.event_end_time,
      owner_username: req.body.username,
      owner_email: req.body.email
    }
    // db.events.create
          db.events.create(eventObject).then(function (result) {
          res.json("new event has been added");
        });
});

    // return all events to calendar
    app.get("/api/getEvents", function (req, res) {
        db.events.findAll({}).then(function (result) {
            var eventsArray = [];

            for (var i = 0; i < result.length; i++) {
                var singleEvent = {
                    "id": result[i].dataValues.event_id,
                    "title": result[i].dataValues.title,
                    // "url": result[i].dataValues.event_url,
                    "url": "/api/events/" + result[i].dataValues.event_id,
                    "class": result[i].dataValues.event_type, //event-special, event-information, event-success
                    "start": result[i].dataValues.event_start_time, // Milliseconds
                    "end": result[i].dataValues.event_end_time // Milliseconds
                };
                eventsArray.push(singleEvent);
            }
            var eventInfo = {
                "success": 1,
                "result": eventsArray
            }


            res.json(eventInfo);
        });
    });

    // Display Event Modal - Listener

app.get("/api/events/:eventID", function(req, res){
  db.events.findOne({
    where: {
      event_id: req.params.eventID
    }
  }).then(function(result){
    // hbs.registerPartial('events-modal', '{{eModal}}');
    // res.json("<h3>"+result.dataValues.title+"</h3>");
    // res.render("eModal", result);
    res.json(result);
    
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

            });
    });
};