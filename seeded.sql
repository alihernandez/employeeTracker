USE employeeTracker_db;

INSERT INTO wageSlaves (employee_name, department, manager_id, role_id)
VALUES ('Alí Hernandez', 'Construction', 1, 401),('PMV', 'Management', 1, 600),('Code C', 'Property Management', 1, 500);

INSERT INTO departments (department_name)
VALUES ('Property Management'),('Constuction'),('Management')