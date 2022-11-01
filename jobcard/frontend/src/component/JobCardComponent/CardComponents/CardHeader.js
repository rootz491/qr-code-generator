import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const cardHeaderStyles = styled({
  cardHeader: {
    width: "100%",
    height: "45px",
    backgroundColor: "#efefef",
  },
  name: {
    padding: "12px 8px",
    fontSize: "20px",
    lineHeight: "24px",
    color: "#000000",
  },
});

const CardHeader = ({ name }) => {
  const classes = cardHeaderStyles();
  return (
    <div className={classes.cardHeader}>
      <Typography fontWeight={700} className={classes.name}>
        {name}
      </Typography>
    </div>
  );
};

export default CardHeader;
