import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import ReusableForm from '../components/ReusableForm';
import { useEmployeeContext } from '../updateEmployeeContext';
 const UpdateEmployeePage = () => {
    const navigate = useNavigate();
    const { employee } = useLocation().state || {};
    const { id } = useParams();
    
    const [firstname, setFirstname] = useState(employee.first_name);
    const [lastname, setLastname] = useState(employee.last_name);
    const [email, setEmail] = useState(employee.email);
    const {updateemployees, setUpdateEmployees} = useEmployeeContext();

    const createEmployee = async (e) => {
        e.preventDefault();
        console.log('clicked submit login');
        // Check if any field is empty
        if (!firstname || !lastname || !email) {
            alert('Please fill all the fields');
            return;
        }
        if (firstname.length < 1 || firstname.length > 20) {
            alert('First name must be between 1 and 20 characters');
            return;
        }
    
        if (lastname.length < 1 || lastname.length > 20) {
            alert('Last name must be between 1 and 20 characters');
            return;
        }
        // Validate email format
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            alert('Invalid Email');
            return;
        }

        try {
            const response = await axios.put(
                `https://reqres.in/api/users/${id}`,
                { first_name: firstname, last_name: lastname, email: email },
                {
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                    },
                }
            );
            if (response.status === 200) {
                const { first_name, last_name, email } = response.data;
        
                const updatedEmployee = {
                    id, 
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                };

                setUpdateEmployees(prevEmployees => {
                    const existingEmployeeIndex = prevEmployees.findIndex(emp => emp.id == id);
                    
                    if (existingEmployeeIndex > -1) {
                        // Employee exists, update it
                        const updatedEmployees = [...prevEmployees];
                        updatedEmployees[existingEmployeeIndex] = updatedEmployee;
                        return updatedEmployees;
                    } else {
                        // Employee does not exist, add it
                        return [...prevEmployees, updatedEmployee];
                    }
                });
                navigate('/home');
            } else {
                alert('Update failed: ' + response.statusText);
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    const fields = [
        {
            label: 'First Name',
            type: 'text',
            value: firstname,
            onChange: (e) => setFirstname(e.target.value),
            placeholder: 'Enter First Name',
        },
        {
            label: 'Last Name',
            type: 'text',
            value: lastname,
            onChange: (e) => setLastname(e.target.value),
            placeholder: 'Enter Last Name',
        },
        {
            label: 'Email',
            type: 'email', 
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: 'Enter Email',
        },
    ];

    return (
        <div>
            <Header />
            <ReusableForm title="Employee Edit" onSubmit={createEmployee} fields={fields} />
        </div>
    );
};

export default UpdateEmployeePage;