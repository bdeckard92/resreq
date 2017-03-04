var db = require("../models");

module.exports = function(app) {

	//get route for getting appetizer table info
    app.get("/api/appetizer", function(res, req) {
        db.appetizer.findAll({}).then(function(dbmenu) {
            res.json(dbmenu);
        });
    });

    app.post("/api/appetizer", function(res, req){
    	console.log(req.body);

    	db.appetizer.create({
    		text: req.body.text
    	});
    });
}
