import './App.css';
// import EmployeeListPage from './pages/employeeListPage';
import EmployeeListPagee from './pages/employeeListPagee';
import LoginPage from './pages/loginPage';
import  UpdateEmployeePage from './pages/updateEmployeePage';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<EmployeeListPagee />} />
      <Route path="/update/:id" element={<UpdateEmployeePage />} />
  </Routes>
  );
}

export default App;
