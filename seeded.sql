USE employeeTracker_db;

INSERT INTO wageSlaves (first_name, last_name, role_id, manager_id)
VALUES ('Alí', 'Hernandez', 400, 1), ('Code', 'C', 300, 1), ('P', 'Mecs', 200, 1);

INSERT INTO departments (department_name)
VALUES ('Property Management'),('Constuction'),('Management');

INSERT INTO roles (title, salary, department_id)
VALUES ('Apprentice', 25000, 111), ('Carpenter', 35000, 222), ('Manager', 45000, 666);