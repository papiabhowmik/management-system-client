import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    users: [],
    companies: []
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://management-system-server-red.vercel.app/api/v1/search?query=${query}`);
      
      const data = response.data || { users: [], companies: [] };

      setSearchResults({
        users: data.users || [],
        companies: data.companies || []
      });

      toast.success('Search results fetched successfully!', { position: 'top-right' });
    } catch (error) {
      setSearchResults({ users: [], companies: [] });
      toast.error('Error fetching search results', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="searchContainer">
     <Link to={"/"} className="back">Back</Link>
      <h3>Search for Users or Companies</h3>
      
      <div className="searchBox">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or company"
          className="searchInput"
        />
        <button onClick={handleSearch} disabled={loading} className="searchButton">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchResults.users && searchResults.users.length > 0 && (
        <div className="tableWrapper">
          <h4>Users:</h4>
          <table className="resultsTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company Name</th>
                <th>Hierarchy Level</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.companyDetails ? user.companyDetails.name : 'N/A'}</td>
                  <td>{user.companyDetails ? user.companyDetails.hierarchyLevel : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {searchResults.companies && searchResults.companies.length > 0 && (
        <div className="tableWrapper">
          <h4>Companies:</h4>
          <table className="resultsTable">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Hierarchy Level</th>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.companies.map((company) => (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>{company.hierarchyLevel}</td>
                  <td>
                    <ul>
                      {company.users && company.users.length > 0 ? (
                        company.users.map((user) => (
                          <li key={user._id}>{user.name} ({user.role})</li>
                        ))
                      ) : (
                        <li>No users found</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {searchResults.users.length === 0 && searchResults.companies.length === 0 && query && (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
};

export default Search;
