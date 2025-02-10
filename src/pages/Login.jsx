import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import DataContext from '../context/DataContext';
import GoBackButton from './GoBackButton';
import SignInwithGoogle from './SignInwithGoogle';


function Login() {
    const { email, setEmail,password, setPassword,handleSubmit,
    } = useContext(DataContext)
  

  return (
    <div className="login-container">
      <GoBackButton/>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>


        <p className="forgot-password ">
          New user? <a href="/register">Register Here</a>
        </p>
        <SignInwithGoogle/>
      </form>
    </div>
  );
}

export default Login;