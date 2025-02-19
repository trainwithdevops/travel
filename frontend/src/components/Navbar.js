import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Travel Community</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          {isAuthenticated ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/find-members">Find Members</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/messages">Messages</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/trip-planner">Trip Planner</Link></li>
              <li className="nav-item"><button onClick={logout} className="btn btn-outline-secondary">Logout</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link class
