var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console");


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
      name: "start",
      type: "list",
      message: "Would you like to do?",
      choices: ["View all employees", "View all Departments", "View all Managers", "Add Employee", "Add Department", "Add Role", "Remove Employee", "Exit"]
    })
    .then(function(answer) {
      // based on their answer
      if (answer.start === "View all Employees") {
        viewAll();
      }
      else if 
        (answer.start === "View all Departments"){
          viewDep();
        }
        else if
        (answer.start === "View all Roles"){
          viewRoles();
        }
        else if 
        (answer.start === "Add Employee"){
          addEmp();
        }
        else if 
        (answer.start === "Add Department"){
          addDep();
        }
        else if(answer.start === "Add Role"){
          newRole();
        }
        else if
        (answer.start === "Remove Employee"){
          removeEmp();
        }
        else if
        (answer.start === "Exit"){
          connection.end();
        }
      else{
        connection.end();
      }
    });
}

//add employee
function addEmp(){
  inquirer.prompt([
    {
      name:"name",
      type: "input",
      message: "What is the employee's first and last name?",
    },
    {
      name:"department",
      type: "input",
      message: "What department is the employee working in?",
    },
    {
      name:"role",
      type: "list",
      message: "Please select employee role",
      choices: res.map(role => { 
        return {name: role.title, value: role.role_id }
      })
    },
    {
      name:"salary",
      type: "input",
      message: "What will the employee's salary be?",
    },
    {
      name:"manager",
      type: "input",
      message: "What is the assigned managers ID number?",
    },
  ])
  .then(function(answer){
    connection.query(
      "INSERT INTO wageSlaves SET ?",
      {
        employee_name: answer.name,
        department: answer.department,
        salary: answer.salary,
        manager_id: answer.manager
      },
      function(err) {
        if (err) throw err;
        console.log("Added employee sucessfully!");
        start();
      }
    )
  })
};

//view all
function viewAll() {
  connection.query(
    "SELECT * FROM wageSlaves",
  function (error, results, fields) {
  if (error) throw error;
  console.table(results)
  start();
})
};

//delete employee
function removeEmp() {
  let query1 = "SELECT * FROM wageSlaves"
  connection.query(query1, (error, res) => {
      if (error) throw error;
      inquirer.prompt([{
        name: "delEmploy",
        type: "list",
        message: "Select employee to be removed",
        choices: res.map(wageSlaves  => {
          return { name: `${wageSlaves.employee_name}`}
        })
      }])
    .then(answer => {
      let query2 = "DELETE FROM wageSlaves WHERE ?"
      connection.query(query2, [{ employee_name: answer.delEmploy}], (err) => {
        if (err) throw err;
        console.log("Employee removed")
        start();
      })
    })
}
  )};


//view department
function viewDep() {
  connection.query(
    "SELECT * FROM departments",
  function (error, results, fields) {
  if (error) throw error;
  console.table(results)
  start();
})
};

//add department
function addDep(){
  inquirer.prompt([
    {
      name:"department",
      type: "input",
      message: "What is the name of the department that will be added?"
    }
  ])
  .then(function(answer){
    connection.query(
      "INSERT INTO departments SET ?",
      {
        name: answer.department,
      },
      function(err) {
        if (err) throw err;
        console.log("Added department sucessfully!");
        start();
      }
    )
  })
};

//view roles
function viewRoles() {
  connection.query(
    "SELECT * FROM roles",
  function (error, results, fields) {
  if (error) throw error;
  console.table(results)
  start();
})
};

//add new role
function newRole() {
  let query1 = "SELECT * FROM roles"
  connection.query (query1, (err, data) => {
    if (err) throw err
    inquierer.prompt([
      {
        name:"roleId",
        type: "input",
        message: "Enter ID for new role"
      },
      {
        name: "role",
        type: "input",
        message: "Enter title of new role"
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter salary for new role"
      },
      {
        name: "depId",
        type: "input",
        message: "Enter Department ID for new role"
      }
    ])
    .then(function (answers) {
      let
    })
  }
    
  )
}

//update employee role