import React, { useState } from "react";
import "./card.css";
import { MdEdit, MdDelete, MdSave, MdCheck, MdClose } from "react-icons/md";
import site from '../../keys/Site'

const Card = React.memo(({ user, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [image_url, setImage] = useState(user.image_url);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setImage(user.image_url)
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
    setShowConfirmation(false);
  };

  const handleSaveClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address!');
      return;
    }
    const phoneRegex = /^(0|\+?91)?\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit phone number!');
      return;
    }
    const updatedUser = {
      _id: user._id,
      name,
      email,
      phone,
      image_url,
    };
    onEdit(updatedUser);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (showConfirmation) {
      onRemove(user._id);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleConfirmationYes = () => {
    onRemove(user._id);
    setShowConfirmation(false);
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
  };

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  return (
    <>
    <div className="wrapper">
      {isEditing ? (
            <input
              type="text"
              className="cardTitleInput"
              value={image_url}
              onChange={(e) => handleChange(e, setImage)}
            />
      ) : (
        <div className="img-area">
          <div className="inner-area">
            <img src={image_url} alt="" />
          </div>
        </div>
      )}
      {isEditing ? (
          <input
            type="text"
            className="cardTitleInput"
            value={name}
            onChange={(e) => handleChange(e, setName)}
          />
        ) : (
          <div className="name">{name}</div>
        )}
      <div className="about">
        {isEditing ? (
            <input
              type="text"
              className="infoValueInput"
              value={phone}
              onChange={(e) => handleChange(e, setPhone)}
            />
          ) : (
            <div className="phone">{phone}</div>
          )}
       {isEditing ? (
            <input
              type="text"
              className="infoValueInput"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
            />
          ) : (
            <div className="mail">{email}</div>
          )}
      </div>
      <div className="cardButtons">
        {isEditing ? (
          <button className="saveButton editButton" onClick={handleSaveClick}>
            <MdSave className="icon" />
          </button>
        ) : (
          <button className="editButton" onClick={handleEditClick}>
            <MdEdit className="icon" />
          </button>
        )}
        {showConfirmation ? (
          <>
            <button
              className="confirmationButton deleteButton"
              onClick={handleConfirmationYes}
            >
              <MdCheck className="icon" />
            </button>
            <button
              className="confirmationButton deleteButton"
              onClick={handleConfirmationNo}
            >
              <MdClose className="icon" />
            </button>
          </>
        ) : (
          <button className="deleteButton" onClick={handleDeleteClick}>
            <MdDelete className="icon" />
          </button>
        )}
      </div>      
    </div>
    </>
  );
});

export default Card;
