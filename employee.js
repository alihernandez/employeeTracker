var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Server80808!",
    database: "employeeTracker_db"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "list",
      message: "Would you like to do?",
      choices: ["View all employees", "View all employees by Department", "View all employees by Manager", "Add Employee"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "View all employees") {
        viewAll();
      }
      //else if(answer.postOrBid === "View all employees by Department") {
        //bidAuction();
      //} 
      else{
        connection.end();
      }
    });
}