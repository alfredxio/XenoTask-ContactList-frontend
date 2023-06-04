import React, { useState,useEffect } from 'react';
import './contacts.css';
import Card from './Card';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'
import site from '../../keys/Site'

const Contacts = ({users,emailx,isNewUser}) => {
    const [contactList, setContactList] = useState(users);
    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState("");

    useEffect(() => {
        setContactList(users);
        getAccessTokenSilently().then((t) => setToken(t));
    }, [users]);
    
    const handleEdit = (updatedUser) => {
        axios.put(`${site}/contacts/${emailx}/${updatedUser._id}`, updatedUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const updatedList = contactList.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
            );
            setContactList(updatedList);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleRemove = async(id) => {
        console.log(id);
        try {
            const response = axios.delete(`${site}/contacts/${emailx}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const updatedList = [...contactList];
                updatedList.splice(id, 1);
                setContactList(updatedList);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    
    return (
        <>
         {(isNewUser || contactList.length === 0)?(<>
          <div className="newUser">No Contacts availble. Create New Account</div>
        </>):<></>}
        <div className="card-container">
            {contactList.map((user, index) => (
            <Card
                key={index}
                user={user}
                onEdit={handleEdit}
                onRemove={() => handleRemove(user._id)}
            />
            ))}
        </div>
        </>
    );
};

export default Contacts;
