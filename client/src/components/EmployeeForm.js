import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/EmployeeForm.css';

const EmployeeForm = ({ currentEmployee, refreshEmployees }) => {
    const [formData, setFormData] = useState({ name: '', role: '', manager_id: '' });

    useEffect(() => {
        if (currentEmployee) {
            setFormData(currentEmployee);
        }
    }, [currentEmployee]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = currentEmployee ? 'put' : 'post';
        const url = currentEmployee ? `http://localhost:3000/employees/${currentEmployee.id}` : 'http://localhost:3000/employees';

        try {
            await axios[method](url, formData);
            refreshEmployees();
            setFormData({ name: '', role: '', manager_id: '' }); // Reset form
        } catch (error) {
            console.error('Failed to submit form', error);
        }
    };

    return (
        <Container>
            <Form className='form-made' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Manager ID</Form.Label>
                    <Form.Control type="number" name="manager_id" value={formData.manager_id} onChange={handleChange} />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default EmployeeForm;
