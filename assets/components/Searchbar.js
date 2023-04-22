import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

export const  Searchbar = ({ setResults }) =>  {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
      fetchUserList(null);
  }, []);

    const fetchUserList = (value) => {
        axios.get('/api/user')
            .then((response) => response.data)
            .then((data) => {
                if (value === null || value == '') {
                    console.log('Ahoj');
                    const results = data;
                    setResults(data);
                    setSearchResults(data);
                } else {
                    const results = data.filter((user) => {
                        return value && user && user.name && user.name.toLowerCase().includes(value.toLowerCase())
                    })
                    setResults(results);
                    setSearchResults(results);
                }
            })
    }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    fetchUserList(event.target.value);
  };


  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li key={item.id}>
            <Link to={`/users/show/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}