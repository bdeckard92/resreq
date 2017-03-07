
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
// Sets up the Express App
// =============================================================
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

var port = 8080;
app.listen(port);
console.log("listening on port " +port);

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: "Bthootu16",
	database: "reservation_db"
});
connection.connect(function(err){
	if(err)throw err;
	console.log('Connected as id: '+connection.threadId)
})
//gets info from database to send to handlebar ul on index.handlebars this works
app.get("/",function(req,res){
	connection.query("SELECT name, date FROM reservations;", function(err,data){
		res.render('index',{reservations:data});
	})

})
//hopefully inserts a new reservation into database but can't get it to work
app.post('/create', function(req, res){
	connection.query('INSERT INTO reservations (name, phone, email, date) VALUES(?);', [
		res.body.name, 
		res.body.phone, 
		res.body.email, 
		res.body.date
		], function(err,result){
			if(err)throw err;
			res.redirect('/');
		})

});
/*var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
*/
