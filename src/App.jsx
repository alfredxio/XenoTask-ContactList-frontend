import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Contacts from "./components/Contacts/Contacts";
import Home from "./components/Home/Home";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import site from "./keys/Site";

function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [isAdding, setIsAdding] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isNewUser, setisNewUser] = useState(false);
  const [msg, setMsg] = useState("Loading...");

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${site}/contacts/${user.email}`, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
      });
      setContacts(response.data);
      if (response.data.length === 0) {
        setMsg("No contacts found! Add New.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setisNewUser(true);
        setMsg("No contacts found! Add New.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const addContact = (newContact) => {
    setContacts((prevUsers) => [...prevUsers, newContact]);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Home login={loginWithRedirect} />
      ) : (
        <>
          <Header
            addContact={addContact}
            emailx={user.email}
            logout={logout}
            userx={user.name}
            setisNewUser={setisNewUser}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
          />
          <Contacts
            users={contacts}
            emailx={user.email}
            isNewUser={isNewUser}
            setContacts={setContacts}
            msg={msg}
            setMsg={setMsg}
            setIsAdding={setIsAdding}
          />
        </>
      )}
    </>
  );
}

export default App;
