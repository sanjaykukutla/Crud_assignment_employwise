// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../components/ReusableForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ email, password });
    //check for empty fields
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    // Validate email format
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert('Invalid Email');
      return;
  }

  // Validate password length
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
        return ; // Invalid password
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      console.log(response?.data);
      if (response?.data?.token) {
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('user', 'authenticated');
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      alert("Login failed due to some internal error");
    }
    // Clear the form
    setEmail("");
    setPassword("");
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: 'Enter your email',
      required: true,
    },
    {
      label: 'Password',
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: 'Enter your password',
      required: true,
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <ReusableForm title="Login" onSubmit={handleSubmit} fields={fields} />
    </div>
  );
};

export default LoginPage
