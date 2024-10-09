import React, { createContext, useContext, useState } from 'react';

// Create a Context
const EmployeeContext = createContext();

// Create a Provider component
export const EmployeeProvider = ({ children }) => {
  const [updateemployees, setUpdateEmployees] = useState([]);

  return (
    <EmployeeContext.Provider value={{updateemployees, setUpdateEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use the Employee context
export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
