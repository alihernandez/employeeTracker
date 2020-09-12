DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE wageSlaves (
  id INT NOT NULL AUTO_INCREMENT,
  employee_name VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);


SELECT * FROM wageSlaves;