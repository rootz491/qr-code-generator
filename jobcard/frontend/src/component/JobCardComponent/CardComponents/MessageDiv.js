import React from "react";
import { styled } from "@mui/system";

const messageDivStyles = styled({
  messageDiv: {
    height: "150px",
    backgroundColor: "#FFFDC8",
    padding: "4px",
  },
  messageTitle: {
    fontSize: "9px",
    fontWeight: "600",
    lineHeight: "12px",
  },
});

const MessageDiv = ({ message }) => {
  const classes = messageDivStyles();
  return (
    <div className={classes.messageDiv}>
      <span className={classes.messageTitle}>{message}</span>
    </div>
  );
};

export default MessageDiv;
