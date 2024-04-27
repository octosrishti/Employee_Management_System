import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import '../styles/EmployeeList.css';

function EmployeeList({ setEmployeeToEdit, setEditing }) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const { data } = await axios.get('http://localhost:3000/employees');
        setEmployees(data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        fetchEmployees();
    };

    const handleEdit = (employee) => {
        setEmployeeToEdit(employee);
        setEditing(true);
    };

    return (
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Manager ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.role}</td>
                        <td>{employee.manager_id}</td>
                        <td>
                            <Button variant="info" onClick={() => handleEdit(employee)}>
                                Edit
                            </Button>
                            {' '}
                            <Button variant="danger" onClick={() => handleDelete(employee.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default EmployeeList;
