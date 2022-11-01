import React from 'react'
import { makeStyles } from '@mui/styles';

const labelStyles = makeStyles({
  expLabel: {
    // padding: "3px 10px",
    width: "66px",
    height: "16px",
    borderRadius: "20px",
    backgroundColor: "#fb6ec2",
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    lineHeight: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fresherLabel: {
    width: "66px",
    height: "16px",
    borderRadius: "20px",
    backgroundColor: "#1ac8ff",
    color: "#ffffff",
    fontStyle: "italic",
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    lineHeight: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const TypeLabel = ({ fresher, experience }) => {
  const classes = labelStyles();

  if (fresher === "no" && experience.length) {
    return <span className={classes.expLabel}>Experience</span>;
  } else if (fresher === "yes" && experience === "0") {
    return <span className={classes.fresherLabel}>Fresher</span>;
  }
};

export default TypeLabel
