import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './createUser.css'; 

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [role, setRole] = useState('Employee');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://management-system-server-red.vercel.app/api/v1/users', { name, email, companyId, role });
      setMessage(`User created successfully! User ID: ${response.data.userId}`);
      toast.success('User created successfully!', { position: 'top-right' });
      setName('');
      setEmail('');
      setCompanyId('');
      setRole('Employee');
    } catch (error) {
      setMessage('Error creating user');
      toast.error('Error creating user', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createUser">
      <Link to={"/"} className="back">Back</Link>
      <h3>Create New User</h3>
      <form className="createUserForm" onSubmit={handleSubmit}>
        
        <div className="inputGroup">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter user name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="companyId">Company ID</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
            placeholder="Enter company ID"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role (default is Employee)"
          />
        </div>

        <div className="inputGroup">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateUser;
