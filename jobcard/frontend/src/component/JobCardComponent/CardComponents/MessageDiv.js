import React from "react";
import { Box, Typography } from "@mui/material";

const MessageDiv = ({ message, experience }) => {
  return (
    <Box sx={{ height: "140px", backgroundColor: "#FFFDC8", padding: "4px" }}>
      <Typography
        sx={{ marginBottom: "5px", fontSize: "9px", lineHeight: "14px", fontWeight: "600", letterSpacing: "0.2px" }}
      >
        {experience === "Fresher" ? "Why are you a good fit?" : "Short Introduction or Any Message"}
      </Typography>
      <Typography
        sx={{
          fontSize: "9px",
          fontWeight: "300",
          lineHeight: "11px",
          textOverflow: "ellipsis",
          wordBreak: "break-all",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 11,
          WebkitBoxOrient: "vertical",
          height: "120px",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default MessageDiv;
