var path = require("path");
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/menu", function (req, res) {
        res.render("menu");
    });
    app.get("/reserve", function (req, res) {
        res.render("reserve");
    });
    app.get("/events", function (req, res) {
        res.render("events");
    });
    app.get("/reviews", function (req, res) {
        res.render("reviews");
    });
    app.get("/contact", function (req, res) {
        res.render("contact");
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
};
