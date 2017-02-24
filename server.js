var express = require("express");
var bodyParser = require("body-parser");

var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');

var strategy = new StormpathStrategy();



// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));




passport.use(strategy);
passport.serializeUser(strategy.serializeuser);
passport.deserializeUser(strategy.deserializeUser);



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});



app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

app.get("/login", function(req, res) {
res.sendFile(path.join(__dirname + "./public/index.html"));
});
