import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";

function Register() {
  const {setEmail,setPassword,setFname,setLname,handleRegister,email,password} = useContext(DataContext)

  useEffect(() => {
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
  }, [setEmail,setPassword,setFname,setLname]);
 

  return (
    <div className="register">
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>First name</label>
        <input type="text" className="form-control" placeholder="First name" onChange={(e) => setFname(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" onChange={(e) => setLname(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}  value={email}required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <a href="/login">Login</a>
      </p>
    </form>
    </div>
  );
}

export default Register;