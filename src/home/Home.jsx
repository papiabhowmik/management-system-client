import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Company User Management System</h1>
      <div className="buttonContainer">
        <Link to="/create-user">
          <button className="navButton">Create User</button>
        </Link>
        <Link to="/create-company">
          <button className="navButton">Create Company</button>
        </Link>
        <Link to="/get-user">
          <button className="navButton">Get User Details</button>
        </Link>
        <Link to="/get-company">
          <button className="navButton">Get Company Details</button>
        </Link>
        <Link to="/search">
          <button className="navButton">Search Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
