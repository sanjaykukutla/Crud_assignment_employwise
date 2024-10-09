import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';
// import PaginationComponent from '../components/pagination';
import EmployeeCard from '../components/employeeCard';
import SearchBar from '../components/searchbar';

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setEmployees(data.data);
     setTotalPages(data.total_pages); // Set total pages from the API response
  };


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchTerm) ||
    employee.last_name.toLowerCase().includes(searchTerm)
  );

  const handleEdit = (employee) => {
        navigate(`/update/${employee.id}`, { state: { employee } });
  };
    
  
  const handleDelete = (employee1) => {
        axios
          .delete(
            `https://reqres.in/api/users/${employee1.id}`)
          .then((response) => {
              if(response.status===204){
                const updatedEmployees = employees.filter((e) => e.id !== employee1.id);
                //console.log(updatedEmployees);
                // Update both `employees` and `filteredEmployees` states with the filtered array
                setEmployees(updatedEmployees);
                //setFilteredEmployees(updatedEmployees);
              } 
          })
          .catch((error) => {
            alert(error);
          });
        console.log("Delete button clicked");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredEmployees.map((employee,index) => (
          <EmployeeCard key={index}
          employee={employee}
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
        ))}
      </div>

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
      {/* <PaginationComponent
        props={{
          totalPages,
          handlePageChange,
          currentPage,
        }}
      /> */}
    </>
  );
};

export default EmployeeListPage;
