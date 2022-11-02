import React from "react";
import moneyIcon from "../../../icons/money.svg";
import { Box, Typography } from "@mui/material";

const SalaryDiv = ({ current_ctc, current_inhand, expected_inhand, offered_ctc, fresher }) => {
  return (
    <Box
      sx={{
        margin: "0px 8px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        fontWeight: "300",
        fontSize: "8px",
        lineHeight: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Current annual CTC</span>
        </div>
        <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
          {current_ctc}L
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Current monthly in-hand</span>
        </div>
        <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
          {current_inhand}K
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Any offered CTC</span>
        </div>
        <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
          {offered_ctc}L
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Expected CTC</span>
        </div>
        <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
          {expected_inhand}L
        </Typography>
      </div>
    </Box>
  );
};

export default SalaryDiv;
