var express = require("express");

var path = require("path");



var PORT = 3000;

var app = express();


app.use(express.static(process.cwd() + "public"));




var routes = require("./controllers/html_routes.js");

app.get('/',routes);


 app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
