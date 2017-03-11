// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for saving a new item
  app.post("/api/menu", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.start.create({
      Name: req.body.Name,
      Info: req.body.Info,
      Price: req.body.Price,
      Category: req.body.Category
    }).then(function(dbstart) {
      // We have access to the new appetizer as an argument inside of the callback function
      res.json(dbstart);
    });
  });

   // GET route for getting all of the menu
  app.get("/api/menu", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.start.findAll({}).then(function(dbstart) {
      // We have access to the menu as an argument inside of the callback function
      res.json(dbstart);
    });
  });

  // DELETE route for deleting appetizer. We can get the id of the appetizer to be deleted from
  // req.params.id
  app.delete("/api/menu/:id", function(req, res) {
    // We just have to specify which appetizer we want to destroy with "where"
    db.start.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStart) {
      res.json(dbStart);
    });

  });

  // PUT route for updating appetizer. We can get the updated appetizers data from req.body
  app.put("/api/menu", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.start.update({
      Name: req.body.Name,
      Info: req.body.Info,
      Price: req.body.Price,
      Category: req.body.Category
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbStart) {
      res.json(dbStart);
    });
  });

};