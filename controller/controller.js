var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../models");


  // Direct to home page
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });




// Default to home page
  router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


  module.exports = router;