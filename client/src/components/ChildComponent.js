import React from 'react';

const ChildComponent = ({ updateEmployees }) => {
    return (
        <div>
            <button onClick={updateEmployees}>Update Employees</button>
        </div>
    );
};

export default ChildComponent;

