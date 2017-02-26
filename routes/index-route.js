// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Route loads menu.html
  app.get("/menu", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/menu.html"));
  });

};
