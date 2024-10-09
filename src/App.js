import './App.css';
// import EmployeeListPage from './pages/employeeListPage';
import EmployeeListPagee from './pages/employeeListPagee';
import LoginPage from './pages/loginPage';
import  UpdateEmployeePage from './pages/updateEmployeePage';
import { EmployeeProvider } from './updateEmployeeContext';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <EmployeeProvider>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<EmployeeListPagee />} />
      <Route path="/update/:id" element={<UpdateEmployeePage />} />
  </Routes>
  </EmployeeProvider>
  );
}

export default App;
