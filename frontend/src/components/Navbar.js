import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';
import '../styles/main.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/find-members">Find Members</Link></li>
            <li><button onClick={logout} className="navbar-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
