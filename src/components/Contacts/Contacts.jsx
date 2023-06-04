import React, { useState, useEffect } from 'react';
import './contacts.css';
import Card from './Card';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import site from '../../keys/Site';

const Contacts = ({ users, emailx, isNewUser, setContacts, msg }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');
  const [sortBy, setSortBy] = useState('name-asc'); // Track the selected sorting option
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setContacts(users);
    getAccessTokenSilently().then((t) => setToken(t));
  }, [users]);

  const handleEdit = (updatedUser) => {
    axios
      .put(`${site}/contacts/${emailx}/${updatedUser._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newContacts = response.data.contacts;
        setContacts(newContacts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = async (id) => {
    console.log(id);
    try {
      const response = axios
        .delete(`${site}/contacts/${emailx}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const newContacts = response.data.contacts;
          setContacts(newContacts);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sortOptions = {
    'name-asc': (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    'name-desc': (a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
    'date-recent': (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
    'date-old': (a, b) => new Date(a.addedAt) - new Date(b.addedAt),
  };
  
  
  const filteredUsers = filterText.trim() === '' ? users : users.filter((user) => {
    const searchText = filterText.toLowerCase().trim();
    const { name, email, phone } = user;
    return (
      name.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText) ||
      phone.includes(searchText)
    );
  });

  const sortedUsers = filteredUsers.slice().sort(sortOptions[sortBy] || (() => 0));
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <>
      {(isNewUser || users.length === 0) ? (
        <>
          <div className="newUser">{msg}</div>
        </>
      ) : (
        <>
      <div className="sort-container">
        <select id="sort-by" value={sortBy} onChange={handleSortByChange}>
          <option value="name-asc">Name (Asc)</option>
          <option value="name-desc">Name (Desc)</option>
          <option value="date-recent">Date (Recent)</option>
          <option value="date-old">Date (Oldest)</option>
        </select>
        
        <input
          type="text"
          placeholder="Filter"
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </div>
      <div className="card-container">
        {sortedUsers.map((contact, index) => (
          <Card key={index} user={contact} onEdit={handleEdit} onRemove={() => handleRemove(contact._id)} />
        ))}
      </div>
      </>
      )}
    </>
  );
};

export default Contacts;
