var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../models");


  // Direct to home page
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


// Listen for burger owner
router.post("/api/newUser", function(req, res){
    
    // db.users.create

    // var newBurgOwner = {
    //     ownerName: req.body.name,
    //     burgerId: req.params.id
    // };
    // db.burger_owner.create(newBurgOwner).then(function(result){
    //     res.json("Owner has been updated");
    //     res.redirect("/");
    // });
});


  module.exports = router;