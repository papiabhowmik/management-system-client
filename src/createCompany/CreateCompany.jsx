import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './createCompany.css'; 

const CreateCompany = () => {
  const [name, setName] = useState('');
  const [parentCompanyId, setParentCompanyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://management-system-server-red.vercel.app/api/v1/companies', { name, parentCompanyId });
      setMessage(`Company created successfully! Company ID: ${response.data.companyId}`);
      toast.success('Company created successfully!', { position: 'top-right' });
      setName('');
      setParentCompanyId('');
    } catch (error) {
      setMessage('Error creating company');
      toast.error('Error creating company', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createCompany">
      <Link to={"/"} className="back">Back</Link>
      <h3>Create New Company</h3>
      <form className="createCompanyForm" onSubmit={handleSubmit}>
        
        <div className="inputGroup">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter company name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="parentCompanyId">Parent Company ID (optional)</label>
          <input
            type="text"
            id="parentCompanyId"
            name="parentCompanyId"
            value={parentCompanyId}
            onChange={(e) => setParentCompanyId(e.target.value)}
            placeholder="Enter parent company ID (if any)"
          />
        </div>

        <div className="inputGroup">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Company'}
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateCompany;
