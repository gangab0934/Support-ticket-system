import { useState,useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import { Dataprovider } from './context/DataContext';
import Register from './pages/Register';
import AgentDashboard from "./pages/AgentDashboard";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import ViewTicket from "./pages/ViewTicket";
import EditTicket from "./pages/EditTicket";
import About from "./pages/About";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <div className='App'>
  
    <Dataprovider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Login/>} />
        
         {/* Protected routes */}
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/ticket/:ticketId" element={<ViewTicket />} />
          <Route path="/edit-ticket/:ticketId" element={<EditTicket />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
      </Routes>
    </Dataprovider>
    </div>
    
  );
}

export default App;

