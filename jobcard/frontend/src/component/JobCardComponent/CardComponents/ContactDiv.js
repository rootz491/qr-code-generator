import React from 'react'
import mailIcon from "../../../icons/mail.svg";
import callIcon from "../../../icons/call.svg";
import { makeStyles } from '@mui/styles';

const contactDivStyles = makeStyles({
  contactDiv: {
    position: "absolute",
    left: "152px",
    top: "52px",
    backgroundColor: "#cbfd89",
    width: "130px",
    height: "40px",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    paddingLeft: "18px",
    fontSize: "7px",
    fontWeight: "600",
    lineHeight: "8px",
    color: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    justifyContent: "center",
  },
});

const ContactDiv = ({ email, mobile }) => {
  const classes = contactDivStyles();
  return (
    <div className={classes.contactDiv}>
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
