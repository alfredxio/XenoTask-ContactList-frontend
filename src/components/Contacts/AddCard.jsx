import React from "react";
import "./card.css";
import { FaPlusCircle } from "react-icons/fa";

const AddCard = React.memo(({msg}) => {
  return (
    <>
    <div className="wrapper addcardw">
        <div className="msg">{msg}</div>
        {msg==='No Contacts found.'?<div className="msg">Add New</div>:null}
        <FaPlusCircle className="add"/>
    </div>
    </>
  );
});

export default AddCard;
