import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
    const updateEmployees = () => {
        console.log('Employees updated!');
        // Your fetch or update logic goes here
    };

    return (
        <div>
            <h1>Employee Management</h1>
            <ChildComponent updateEmployees={updateEmployees} />
        </div>
    );
};

export default ParentComponent;


