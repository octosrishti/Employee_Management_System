const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Successfully connected to the database.");
});

// API to add a new employee
app.post('/employees', (req, res) => {
    const { name, role } = req.body;  // Remove 'position' from here
    const sql = 'INSERT INTO employees (name, role) VALUES (?, ?)';  // Update SQL query
    db.query(sql, [name, role], (err, result) => {  // Remove 'position' from parameters
        if (err) return res.status(500).send(err.message);
        res.status(201).send('Employee added successfully');
    });
});


// API to get list of all employees
// app.get('/employees', (req, res) => {
//     db.query('SELECT * FROM employees', (err, results) => {
//         if (err) {
//             console.error('Error fetching employees:', err);
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });
app.get('/employees', (req, res) => {
    db.query(`
        WITH RECURSIVE OrgChart AS (
            SELECT id, name, role, manager_id
            FROM employees
            WHERE manager_id IS NULL
            UNION ALL
            SELECT e.id, e.name, e.role, e.manager_id
            FROM employees e
            INNER JOIN OrgChart oc ON oc.id = e.manager_id
        )
        SELECT * FROM OrgChart;
    `, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API to get a specific employee's details, including their manager
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT e.*, m.name as manager_name 
                 FROM employees e 
                 LEFT JOIN employees m ON e.manager_id = m.id 
                 WHERE e.id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching employee:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// API to update employee details
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, manager_id } = req.body;
    const sql = 'UPDATE employees SET name = ?, position = ?, manager_id = ? WHERE id = ?';
    db.query(sql, [name, position, manager_id, id], (err, results) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Employee updated successfully' });
    });
});

// API to remove an employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

// API to retrieve all direct and indirect subordinates of a manager
app.get('/managers/:id/subordinates', (req, res) => {
    const { id } = req.params;
    const sql = `WITH RECURSIVE subordinates AS (
                    SELECT id, name, position 
                    FROM employees 
                    WHERE manager_id = ?
                    UNION ALL
                    SELECT e.id, e.name, e.position
                    FROM employees e
                    INNER JOIN subordinates s ON s.id = e.manager_id
                 )
                 SELECT * FROM subordinates`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error retrieving subordinates:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/employees', (req, res) => {
    fs.readFile('TreeData.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Unable to read data");
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
