// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for saving a new todo
  app.post("/api/menu", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Start.create({
      Name: req.body.Name,
      Info: req.body.Info,
      Price: req.body.Price
    }).then(function(dbStart) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbStart);
    });
  });
};