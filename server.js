
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// always add body parser settings BEFORE the route
var routes = require("./controller/controller.js");

app.use("/", routes);



// Point app to the public directory
app.use(express.static(path.join(__dirname,'./public')));

// {force: true}
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});