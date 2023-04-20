import React from 'react';
import { useEffect, useState } from "react";
import './Login.css'
import { Link } from 'react-router-dom';
import GoogleLogo from '../../assets/Google icon.png';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import ProfilePic from '../../assets/profile-picture.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
  
    if (storedUsername && storedPassword) {
      setEmail(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    if (rememberMe) {
      // Save username and password to local storage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: data.message
        }
        )
        if (data.message == "Login Success") {
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
          navigate("/home")
        }
      });
  }


  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <img src={ProfilePic} 
        alt="Header_Logo" 
        width={'120px'} 
        style={{marginTop:'0px'}}/>
        {/* <button className="googleSignin">
          <img src={GoogleLogo}
            alt="Google_Logo"
            width={'20px'}
            style={{ marginRight: '8px' }} />
          Sign in with Google
        </button>
        <div className="unpwSignin">__ Or Signin with username and password __ </div> */}
        <div className="mb-3">
          <label>Username:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your username here..."
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter youre password here..."
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="rememberMe"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="rememberMe">
    Remember Me
  </label>
</div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        <div className="bottom-text">
          <p>
            Need an account? </p>
          <Link className="nav-link" to={"/save"}><a>Sign Up</a></Link>
        </div>
      </form>
    </div>
  )
}

export default Login




















