import React from "react";
import { Box, Typography } from "@mui/material";

const MessageDiv = ({ message }) => {
  return (
    <Box sx={{ height: "150px", backgroundColor: "#FFFDC8", padding: "4px", marginTop: "20px" }}>
      <Typography sx={{ fontSize: "9px", fontWeight: "600", lineHeight: "12px" }}>{message}</Typography>
    </Box>
  );
};

export default MessageDiv;
