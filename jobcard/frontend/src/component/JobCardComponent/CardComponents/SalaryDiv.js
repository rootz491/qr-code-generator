import React from "react";
import moneyIcon from "../../../icons/money.svg";
import resumeIcon from "../../../icons/resumeIcon.svg";
import { Box, Typography } from "@mui/material";

const SalaryDiv = ({ current_ctc, current_inhand, expected_inhand, offered_ctc, formState }) => {
  const ResumeDiv = () => {
    return (
      <>
        {formState.resume && (
          <div className="resumeDiv">
            <img src={resumeIcon} alt="resume" height="12px" width="12px" />
            <a
              href={formState.resume.data}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "#000000",
                width: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formState?.resume?.name ?? "Preview Resume"}
            </a>
          </div>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        padding: "0px 8px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        fontWeight: "300",
        fontSize: "8px",
        lineHeight: "10px",
        width: "50%",
        boxSizing: "border-box",
      }}
    >
      {formState.experience === "Fresher" ? (
        <></>
      ) : (
        <>
          <div style={{ display: "flex", gap: "3px" }}>
            <div style={{ display: "flex", gap: "7px", width: "105px" }}>
              <img src={moneyIcon} alt="money" height="10px" width="10px" />
              <span>Current annual CTC</span>
            </div>
            <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
              {current_ctc}
            </Typography>
          </div>

          <div style={{ display: "flex", gap: "3px" }}>
            <div style={{ display: "flex", gap: "7px", width: "105px" }}>
              <img src={moneyIcon} alt="money" height="10px" width="10px" />
              <span>Current monthly in-hand</span>
            </div>
            <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
              {current_inhand}
            </Typography>
          </div>

          <div style={{ display: "flex", gap: "3px" }}>
            <div style={{ display: "flex", gap: "7px", width: "105px" }}>
              <img src={moneyIcon} alt="money" height="10px" width="10px" />
              <span>Any offered CTC</span>
            </div>
            <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
              {offered_ctc}
            </Typography>
          </div>
        </>
      )}
      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Expected CTC</span>
        </div>
        <Typography sx={{ fontWeight: "700", letterSpacing: "0.2px", fontSize: "8px", lineHeight: "10px" }}>
          {expected_inhand}
        </Typography>
      </div>
      {ResumeDiv()}
    </Box>
  );
};

export default SalaryDiv;
