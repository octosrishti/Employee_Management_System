import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import {RequireToken} from './components/Auth.js'
 
import Dashboard from "./components/Dashboard.js";
import Home from "./components/Home";
import Employee from "./components/Employee.js";
import Profile from "./components/Profile.js";
import AddEmployee from "./components/AddEmployee.js";
import EditEmployee from './components/EditEmployee.js'
 
function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
               
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
                  <Route path='' element={<Home />}></Route>
                  <Route path='/employee' element={<Employee />}></Route>
                  <Route path='/profile' element={<Profile />}></Route>
                  <Route path='/create' element={<AddEmployee />}></Route>
                  <Route path='/employeeedit/:id' element={<EditEmployee />}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
   
export default App;
