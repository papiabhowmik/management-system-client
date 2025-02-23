import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './getCompany.css';  // Add a separate CSS file for styling

const GetCompany = () => {
  const [companyId, setCompanyId] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://management-system-server-red.vercel.app/api/v1/companies/${companyId}`);
      setCompanyData(response.data);
      toast.success('Company fetched successfully', { position: 'top-right' });
    } catch (error) {
      setError('Error fetching company data');
      setCompanyData(null);
      toast.error('Error fetching company data', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="getCompany">
      <Link to={"/"} className="back">Back</Link>
      <h3>Get Company Details</h3>
      <form className="getCompanyForm" onSubmit={handleSubmit}>
        
        <div className="inputGroup">
          <label htmlFor="companyId">Company ID</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            placeholder="Enter Company ID"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Company Data'}
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {companyData && (
        <div className="companyDetails">
          <h4>Company Details</h4>
          <p><strong>Name:</strong> {companyData.companyDetails.name}</p>
          <p><strong>Hierarchy Level:</strong> {companyData.companyDetails.hierarchyLevel}</p>

          <h4>Users:</h4>
          <ul>
            {companyData.users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email} - {user.role}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetCompany;
