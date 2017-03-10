
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  user: "root",
  host: "localhost",
  password: "Bthootu16",
  database: "resreq_practice"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


module.exports = connection;
