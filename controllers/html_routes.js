
var path = require("path");
var express = require("express");
var app = express();

	console.log(5+6);

	/*app.get('/',function(req,res){
		res.redirect('/menuMaker');
	});
	*/
	app.get("/", function(req, res) {
	    res.sendFile(path.join(__dirname + "/../public/menuMaker.html"));
  	});

module.exports=app;
