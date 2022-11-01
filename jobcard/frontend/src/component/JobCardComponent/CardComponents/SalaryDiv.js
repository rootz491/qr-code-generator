import React from "react";
import moneyIcon from "../../../icons/money.svg";
import { styled } from "@mui/system";

const salaryDivStyles = styled({
  salaryDiv: {
    margin: "0px 8px",
    // width: "120px",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontWeight: "300",
    fontSize: "8px",
    lineHeight: "10px",
  },
  salaryText: {
    fontWeight: "700",
    letterSpacing: "0.2px",
    fontSize: "8px",
    lineHeight: "10px",
  },
});

const SalaryDiv = ({ current_ctc, current_inhand, expected_inhand, offered_ctc, fresher }) => {
  const classes = salaryDivStyles();

  return (
    <div className={classes.salaryDiv}>
      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Current annual CTC</span>
        </div>
        <span className={classes.salaryText}>{current_ctc}</span>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Current monthly in-hand</span>
        </div>
        <span className={classes.salaryText}>{current_inhand}</span>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Any offered CTC</span>
        </div>
        <span className={classes.salaryText}>{offered_ctc}</span>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ display: "flex", gap: "7px", width: "105px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <span>Expected CTC</span>
        </div>
        <span className={classes.salaryText}>{expected_inhand}</span>
      </div>
    </div>
  );
};

export default SalaryDiv;
