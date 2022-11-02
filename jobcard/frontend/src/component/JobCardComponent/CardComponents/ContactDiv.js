import React from "react";
import mailIcon from "../../../icons/mail.svg";
import callIcon from "../../../icons/call.svg";
import "./../index.css";

const ContactDiv = ({ email, mobile }) => {
  return (
    <div className="contactDiv">
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <img src={mailIcon} alt="mail" />
        <span className="email">{email}</span>
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <img src={callIcon} alt="call" />
        <span className="mobile">{mobile}</span>
      </div>
    </div>
  );
};

export default ContactDiv;
