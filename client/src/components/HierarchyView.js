import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HierarchyView.css';

function HierarchicalView() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.log('Error fetching data:', error));
    }, []);

    const renderTree = (node) => {
        const children = employees.filter(emp => emp.manager_id === node.id);
        return (
            <li key={node.id}>
                {node.name} - {node.role}
                {children.length > 0 && <ul>{children.map(renderTree)}</ul>}
            </li>
        );
    };

    return (
        <div className='heirarchy'>
        <ul>{employees.filter(emp => emp.manager_id === null).map(renderTree)}</ul>
        </div>
    );
}

export default HierarchicalView;
