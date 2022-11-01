import React from "react";
import moneyIcon from "../../../icons/money.svg";

const SalaryDiv = ({ current_ctc, current_inhand, expected_inhand, formState }) => {
  return (
    <div className="salaryDiv">
      {formState.experience !== "Fresher" ? (
        <>
          <div style={{ display: "flex", gap: "7px" }}>
            <img src={moneyIcon} alt="money" height="10px" width="10px" />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span>Current CTC</span>
              <span className="exampleText">(in L/yr Ex-4L,20L)</span>
            </div>
            <span className="salaryText">{current_ctc}</span>
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            <img src={moneyIcon} alt="money" height="10px" width="10px" />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span>Current In-hand</span>
              <span className="exampleText">(in K/month Ex-20K,65K)</span>
            </div>
            <span className="salaryText">{current_inhand}</span>
          </div>
        </>
      ) : (
        <></>
      )}
      <div style={{ display: "flex", gap: "7px" }}>
        <img src={moneyIcon} alt="money" height="10px" width="10px" />
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span>Expected In-hand</span>
          <span className="exampleText">(in K/month Ex-20K,65K)</span>
        </div>
        <span className="salaryText">{expected_inhand}</span>
      </div>
    </div>
  );
};

export default SalaryDiv;
