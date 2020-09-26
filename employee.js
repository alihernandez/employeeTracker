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
  database: "employeeTracker_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
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
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "update employee role",
        "Remove Employee",
        "Exit",
      ],
    })
    .then(function (answer) {
      // based on their answer
      if (answer.start === "View all Employees") {
        viewAll();
      } else if (answer.start === "View all Departments") {
        viewDep();
      } else if (answer.start === "View all Roles") {
        viewRoles();
      } else if (answer.start === "Add Employee") {
        addEmp();
      } else if (answer.start === "Add Department") {
        addDep();
      } else if (answer.start === "Add Role") {
        newRole();
      } else if (answer.start === "Remove Employee") {
        removeEmp();
      } else if (answer.start === "update employee role") {
        updateEmp();
      } else if (answer.start === "Exit") {
        connection.end();
      } else {
        connection.end();
      }
    });
}
//view all employess
function viewAll() {
  connection.query("SELECT * FROM wageSlaves", function (error, results) {
    if (error) throw error;
    console.table(results);
    start();
  });
}

//view department
function viewDep() {
  connection.query("SELECT * FROM departments", function (error, results) {
    if (error) throw error;
    console.table(results);
    start();
  });
}

//view roles
function viewRoles() {
  connection.query("SELECT * FROM roles", function (error, results) {
    if (error) throw error;
    console.table(results);
    start();
  });
}
// let addQuery = `SELECT wageSlaves.id, wageSlaves.employee_name, wageSlaves.role_id, roles.title, departments.department_name, wageSlaves.manager_id
//   FROM wageSlaves, departments, roles`
// INNER JOIN roles on roles.id = wageSlaves.role_id
//     INNER JOIN departments ON departments.id = roles.department_id
//add employee
//make 2 queries
function addEmp() {
  let addQuery = `SELECT id, title
  FROM roles`;
  connection.query(addQuery, (err, roleRes) => {
    if (err) throw err;
    // console.log(res);

    let departmentQuery = `SELECT * FROM departments`;
    connection.query(departmentQuery, (error, departmentRes) => {
      let managerQuery = `SELECT * FROM wageSlaves`;
      connection.query(managerQuery, (error, managerRes) => {
        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "lastName",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "department",
              type: "list",
              message: "What department is the employee working in?",
              choices: departmentRes.map((departments) => {
                return {
                  name: `${departments.department_name}`,
                };
              }),
            },
            {
              name: "role",
              type: "list",
              message: "Please select employee role",
              choices: roleRes.map((roles) => {
                return {
                  id: `${roles.id}`,
                  name: `${roles.id + " " + roles.title}`,
                };
              }),
            },
            // {
            //   name:"salary",
            //   type: "input",
            //   message: "What will the employee's salary be?",
            // },
            {
              name: "manager",
              type: "list",
              message: "What is the assigned managers ID number?",
              choices: managerRes.map((manager) => {
                return {
                  id: `${manager.id}`,
                  name: `${
                    manager.id +
                    " " +
                    manager.first_name +
                    " " +
                    manager.last_name
                  }`,
                };
              }),
            },
          ])
          .then(function (answer) {
            console.log(answer);
            connection.query(
              "INSERT INTO wageSlaves SET ?",
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                manager_id: answer.manager.split(" ")[0],
                role_id: answer.role.split(" ")[0],
              },
              function (err) {
                if (err) throw err;
                console.log("Added employee sucessfully!");
                start();
              }
            );
          });
      });
    });
  });
}

//add new role
function newRole() {
  let query1 = "SELECT * FROM roles";
  connection.query(query1, (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "roleId",
          type: "input",
          message: "Enter ID for new role",
        },
        {
          name: "role",
          type: "input",
          message: "Enter title of new role",
        },
        {
          name: "salary",
          type: "input",
          message: "Please enter salary for new role",
        },
        {
          name: "depId",
          type: "input",
          message: "Enter Department ID for new role",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            id: answer.roleId,
            title: answer.role,
            salary: answer.salary,
            department_id: answer.depId,
          },
          function (err) {
            if (err) throw err;
            console.log("Added role sucessfully!");
            start();
          }
        );
      });
  });
}

//add department
function addDep() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department that will be added?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Added department sucessfully!");
          start();
        }
      );
    });
}

//update employee role
function updateEmp() {
  let updateQuery = "SELECT * FROM wageSlaves";
  connection.query(updateQuery, (error, updateRes) => {
    let roleQuery = "SELECT * FROM roles";

    connection.query(roleQuery, (error, roleRes) => {
      inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",
            message: "Please select employee to update:",
            choices: updateRes.map((wageSlaves) => {
              return {
                name: `${
                  wageSlaves.id +
                  " " +
                  wageSlaves.first_name +
                  " " +
                  wageSlaves.last_name
                }`,
              };
            }),
          },
          {
            name: "employeeRole",
            type: "list",
            message: "Please select new role:",
            choices: roleRes.map((roles) => {
              // console.log(roles)
              return `${roles.id} ${roles.title}`;
            }),
          },
        ])
        .then((answer) => {
          // console.log(answer)
          let updateRole = `UPDATE wageSlaves SET role_id = ${
            answer.employeeRole.split(" ")[0]
          }  WHERE id = ${answer.employeeName.split(" ")[0]}`;
          connection.query(updateRole, (error, updateRes) => {
            console.log("Role updated!");
            start();
          });
        });
    });
  });
}

delete employee
function removeEmp() {
  let query1 = "SELECT * FROM wageSlaves";
  connection.query(query1, (error, res) => {
    if (error) throw error;
    inquirer
      .prompt([
        {
          name: "delEmploy",
          type: "list",
          message: "Select employee to be removed",
          choices: res.map((wageSlaves) => {
            return { name: `${wageSlaves.first_name + " " + wageSlaves.last_name}` };
          }),
        },
      ])
      .then((answer) => {
        let query2 = "DELETE FROM wageSlaves WHERE ?";
        connection.query(
          query2,
          [{ first_name, last_name: answer.delEmploy }],
          (err) => {
            if (err) throw err;
            console.log("Employee removed");
            start();
          }
        );
      });
  });
}

//CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
