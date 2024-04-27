import React, { useState,useEffect, useRef }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar';
import Home from './components/Home';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import HierarchyView from './components/HierarchyView';
import ParentComponent from './components/ParentComponent';
import initialData from './data/TreeData.json';

function App() {
    const [treeData, setTreeData] = useState(initialData);

    useEffect(() => {
        // Fetch initial tree data if needed or use static data as above
        setTreeData(initialData);
    }, []);
    const handleAddEmployee = (newEmployee) => {
        // Here you would normally handle API posting etc.
        // For demonstration, we simply add to local state assuming `newEmployee` has { name, role, managerId }

        const updatedData = { ...treeData };  // Make a shallow copy of the current state

        // Function to recursively find and update the manager node
        function addEmployee(node) {
            if (node.id === newEmployee.managerId) {
                if (!node.children) {
                    node.children = [];  // Ensure children array exists
                }
                node.children.push({ name: newEmployee.name, role: newEmployee.role, id: newEmployee.id, children: [] });
                return;
            }
            node.children && node.children.forEach(addEmployee);
        }

        addEmployee(updatedData);
        setTreeData(updatedData);  // Update the state with the new data
    };

    return (
        <Router>
            <CustomNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<EmployeeForm />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/view" element={<HierarchyView />} />
            </Routes>
        </Router>
    );
}

export default App;
