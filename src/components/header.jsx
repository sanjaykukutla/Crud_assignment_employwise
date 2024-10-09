import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {

const navigate = useNavigate();
const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
}

const token = localStorage.getItem('token');

  // Conditional rendering
  if (!token) {
    return null; 
  }

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <a href="/home" className="text-3xl text-blue-500 hover:underline">
          Employees List
        </a>

        <button
          className="bg-red-500 text-white rounded-lg hover:bg-red-600 py-2 px-5 text-xl md:px-8 md:py-3 md:text-2xl"
          onClick={handlelogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Header