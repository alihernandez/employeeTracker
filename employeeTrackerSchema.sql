DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE wageSlaves (
  id INT NOT NULL AUTO_INCREMENT,
  employee_name VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  manager_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  id INT AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(7, 0) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);
SELECT * FROM wageSlaves;
SELECT * FROM departments;
SELECT * FROM roles;