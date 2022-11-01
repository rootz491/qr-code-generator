import React from "react";
import { Typography, Box } from "@mui/material";

const CardHeader = ({ name }) => {
  return (
    <Box sx={{ width: "100%", height: "45px", backgroundColor: "#efefef" }}>
      <Typography fontWeight={700} sx={{ padding: "12px 8px", fontSize: "20px", lineHeight: "24px", color: "#000000" }}>
        {name}
      </Typography>
    </Box>
  );
};

export default CardHeader;
