
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
// Sets up the Express App
// =============================================================
var app = express();
var port = 8080;

app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');




var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: "Bthootu16",
	database: "reservation_db"
});

connection.connect(function(err){
	if(err)throw err;
	console.log('Connected as id: '+connection.threadId)
});
/*this will show admin all reservations
app.get("/",function(req,res){
	connection.query("SELECT name, date FROM reservations;", function(err,data){
		res.render('index',{reservations:data});
	})

});*/
//var getEmail = (req.body.email);
app.get("/", function(req,res){
	connection.query("SELECT name, date FROM reservations WHERE email= getEmail ;", function(err,data){
		res.render('index', {reservations:data});
	})
});



//hopefully inserts a new reservation into database but can't get it to work
app.post('/create', function(req, res){
	console.log(req.body);
	connection.query('INSERT INTO reservations (name, phone, email, date) VALUES(?,?,?,?);', [
		req.body.name, 
		req.body.phone, 
		req.body.email, 
		req.body.date
		], function(err,result){
			if(err)throw err;
			res.redirect('/');
		})

});

app.listen(port);
console.log("listening on port " +port);