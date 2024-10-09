import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';
import SearchBar from '../components/searchbar';
import { useEmployeeContext } from '../updateEmployeeContext';
import '../index.css'

const EmployeeCard = lazy(() => import('../components/employeeCard'));

const EmployeeListPagee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const {updateemployees} = useEmployeeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 

    fetch(`https://reqres.in/api/users?page=${currentPage}`, {
        headers: {
            authorization: localStorage.getItem('token'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        //console.log(data.data);

        const updatesLookup = Object.fromEntries(updateemployees.map(emp => [emp.id, emp]));

        const updatedEmployees = data.data.map(emp => {
            const updatedEmp = updatesLookup[emp.id];
            console.log(updatedEmp);

            return updatedEmp ? { 
                ...emp, 
                email: updatedEmp.email, 
                last_name: updatedEmp.last_name, 
                first_name: updatedEmp.first_name 
            } : emp;
        });

        setEmployees(updatedEmployees); 
        setTotalPages(data.total_pages);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    })
    .finally(() => {
        setLoading(false); 
    });
}, [currentPage, updateemployees]);


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredEmployees = employees.filter(employee =>
    employee?.first_name.toLowerCase().includes(searchTerm) ||
    employee?.last_name.toLowerCase().includes(searchTerm)
  );

  const handleEdit = (employee) => {
    navigate(`/update/${employee.id}`, { state: { employee } });
  };

  const handleDelete = (employee1) => {
    axios
      .delete(`https://reqres.in/api/users/${employee1.id}`,
      {
        headers: {
            'Content-Type': 'application/json', // Change this to application/json
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Format the token correctly
        },
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedEmployees = employees.filter((e) => e.id !== employee1.id);
          setEmployees(updatedEmployees);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const token = localStorage.getItem('token');

  // Conditional rendering
  if (!token) {
    return null; 
  }

  return (
    <>
      <Header />
      <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} />
      
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div >Loading...</div> 
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <Suspense fallback={<div >Loading Cards...</div>}>
            {filteredEmployees?.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
            </Suspense>
        </div>
       )}

      <div className="flex justify-center mt-12">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 m-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EmployeeListPagee;
