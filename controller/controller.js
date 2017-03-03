var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../models");


// Direct to home page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/auth.html"));
});

router.get("/events", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/events.html"));
});

// return all events to calendar
router.get("/api/getEvents", function(req, res){
    db.events.findAll({}).then(function(result){
      var eventsArray = [];
      
      for (var i = 0; i < result.length; i++) {
				var singleEvent = {
					"id": result[i].dataValues.event_id,
					"title": result[i].dataValues.title,
					// "url": result[i].dataValues.event_url,
          "url": "/api/events/"+result[i].dataValues.event_id,
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

router.get("/api/events/:eventID", function(req, res){
  db.events.findOne({
    where: {
      event_id: req.params.eventID
    }
  }).then(function(result){

    res.json("<h3>"+result.dataValues.title+"</h3>");
  });
});


// Listen for burger owner
router.post("/api/newUser", function (req, res) {
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

router.post("/api/newEvent", function(req, res){
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


module.exports = router;