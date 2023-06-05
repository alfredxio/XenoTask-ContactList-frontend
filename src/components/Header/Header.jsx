import React, { useState } from "react";
import "./header.css";
import "./addform.css";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import site from "../../keys/Site";

const Header = ({ addContact, emailx, logout, userx, setisNewUser, isAdding, setIsAdding}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [contact, setContact] = useState({
    image_url: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleAddClick = () => {
    if (isAdding) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };

  const handleCollapse = () => {
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      alert("Please enter a valid email address!");
      return;
    }
    const phoneRegex = /^(0|\+?91)?\d{10}$/;
    if (!phoneRegex.test(contact.phone)) {
      alert("Please enter a valid 10-digit phone number!");
      return;
    }
    const getToken = await getAccessTokenSilently();
    setToken(getToken);
    var imgx =
      contact.image_url === ""
        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        : contact.image_url;
    await axios
      .post(
        `${site}/contacts/${emailx}`,
        {
          image_url: imgx,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((response) => {
        const lastContact = response.data.contacts.slice(-1)[0];
        addContact({ ...contact, _id: lastContact._id });
        setisNewUser(false);
        setContact({
          image_url: "",
          name: "",
          email: "",
          phone: "",
        });
        setIsAdding(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="headerx">
        <div className="header">
          <div className="logo">
            <h1>ContactX</h1>
          </div>
          <div className="right">
            <div className="usergreet">
              <span className="greet">
                Hello! <b>{userx}</b>
              </span>
            </div>
            <div className="buttongreet">
              <button className="addButton" onClick={handleAddClick}>
                <FaUserPlus /> Add Contact
              </button>
              <button className="addButton logoutButton" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className={`${isAdding ? "show-content" : ""} addDetails`}>
          <h3>Add New Contact</h3>
          <input
            type="text"
            name="image_url"
            placeholder="Image"
            value={contact.image_url}
            onChange={handleInputChange}
            className="inputField"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={handleInputChange}
            className="inputField"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={handleInputChange}
            className="inputField"
          />
          <input
            type="phone"
            name="phone"
            placeholder="Phone"
            value={contact.phone}
            onChange={handleInputChange}
            className="inputField"
          />
          <button className="saveButton" onClick={handleSaveClick}>
            Save
          </button>
          <button className="closeButton" onClick={handleCollapse}>
            Close
          </button>
        </div>
        <div className={`${isAdding ? "show-backdrop" : ""} backdrop`}></div>
      </div>
    </>
  );
};

export default Header;
