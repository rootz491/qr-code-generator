import React from "react";
import { Typography } from "@mui/material";

const TypeLabel = ({ fresher, experience }) => {
  if (fresher === "no") {
    return (
      <Typography
        sx={{
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
        }}
      >
        Experience
      </Typography>
    );
  } else if (fresher === "yes") {
    return (
      <Typography
        sx={{
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
        }}
      >
        Fresher
      </Typography>
    );
  }
};

export default TypeLabel;
