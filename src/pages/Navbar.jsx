import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    
  
  return (
    <nav className="navbar">
      <div className="logo">Support Ticket</div>
      <ul className="nav-links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/logout'>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;