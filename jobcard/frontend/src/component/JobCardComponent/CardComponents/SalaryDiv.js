import React from 'react';
import moneyIcon from "../../../icons/money.svg";

const SalaryDiv = ({ current_ctc, current_inhand, expected_inhand }) => {
  return (
    <div className="salaryDiv">
      <div style={{ display: "flex", gap: "7px" }}>
        <img src={moneyIcon} alt="money" height="10px" width="10px" />
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span>Current CTC</span>
          <span className="exampleText">(in L/yr Ex-4L,20L)</span>
        </div>
        <span className="salaryText">{current_ctc}L</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "7px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span>Current In-hand</span>
            <span className="exampleText">(in K/month Ex-20K,65K)</span>
          </div>
          <span className="salaryText">{current_inhand}K</span>
        </div>
        <div style={{ display: "flex", gap: "7px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span>Expected In-hand</span>
            <span className="exampleText">(in K/month Ex-20K,65K)</span>
          </div>
          <span className="salaryText">{expected_inhand}K</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryDiv;