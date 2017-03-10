var express = require("express");

var router = express.Router();


//var burger = require("../models/burger.js");



router.get("/", function(req, res) {
   res.redirect("/resreq_practice");
});

router.get("/resreq_practice", function(req, res) {
    burger.all(function(data) {
        res.render("menuMaker", { burger_data: data })

    });
});

router.post("/resreq_/create", function(req, res) {
    burger.create(req.body., function(result) {
        console.log(result);
        res.redirect("/");
    });

});


router.put("/burgers/update", function(req, res) {


    burger.update(req.body.burger_id, function(result) {
        console.log(result);
        res.redirect("/");


    });
});




module.exports = router;