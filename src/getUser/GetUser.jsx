import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './getUser.css';  // Add a CSS file for styling

const GetUser = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://management-system-server-red.vercel.app/api/v1/users/${userId}`);
      setUserData(response.data);
      toast.success('User fetched successfully', { position: 'top-right' });
    } catch (error) {
      setError('Error fetching user data');
      setUserData(null);
      toast.error('Error fetching user data', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="getUser">
      <Link to={"/"} className="back">Back</Link>
      <h3>Get User Details</h3>
      <form className="getUserForm" onSubmit={handleSubmit}>
        
        <div className="inputGroup">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get User Data'}
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="userDetails">
          <h4>User Details</h4>
          <p><strong>Name:</strong> {userData.userDetails.name}</p>
          <p><strong>Email:</strong> {userData.userDetails.email}</p>
          <p><strong>Role:</strong> {userData.userDetails.role}</p>

          <h4>Company Details</h4>
          <p><strong>Name:</strong> {userData.companyDetails.name}</p>
          <p><strong>Hierarchy Level:</strong> {userData.companyDetails.hierarchyLevel}</p>
        </div>
      )}
    </div>
  );
};

export default GetUser;
