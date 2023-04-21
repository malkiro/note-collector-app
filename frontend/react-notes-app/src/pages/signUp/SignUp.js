import React from 'react';
import './SignUp.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignUp() {
  const [user, setUser] = useState({
    employeename: "",
    email: "",
    password: ""
  });

  const { employeename, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user/save", user)
      .then(function (response) {
        setUser({
          employeename: "",
          email: "",
          password: ""
        });
        Swal.fire({
          title: 'Registration Successful',
        }
        )
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      });
  };

  return (
    <div className='signUp'>
      <form onSubmit={(e) => onSubmit(e)}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Your Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name here..."
            name="employeename"
            value={employeename}
            required
            onChange={(e) => onInputChange(e)}
          />
        </div>


        <div className="mb-3">
          <label>Email Address:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email here..."
            name="email"
            value={email}
            required
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password here..."
            name="password"
            value={password}
            required
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <div className="bottom-text">
          <p>
            Already registered? </p>
          <Link className="nav-link" to={"/"}><a>Login</a></Link>
        </div>

      </form>
    </div>
  )
}

export default SignUp