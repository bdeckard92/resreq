// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the reservations
  app.get("/api/reservation_db", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Reservation.findAll({}).then(function(dbReservation) {
      // We have access to the reservations as an argument inside of the callback function
      res.json(dbReservation);
    });
  });

  // POST route for saving a new reservation
  app.post("/api/reservation_db", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with the name, phone, email, and date
    db.Reservation.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date
    }).then(function(dbReservation) {
      // We have access to the new reservation as an argument inside of the callback function
      res.json(dbReservation);
    });
  });

  // DELETE route for deleting reservations. We can get the id of the reservation to be deleted from
  // req.params.id. we still need to decide how to do this, on the admin side maybe?
  app.delete("/api/reservation_db/:id", function(req, res) {
    // We just have to specify which reservation we want to destroy with "where"
    db.Reservation.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReservation) {
      res.json(dbReservation);
    });

  });

  // PUT route for updating reservation. We can get the updated reservation data from req.body
  app.put("/api/reservation_db", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Reservation.update({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });

};
