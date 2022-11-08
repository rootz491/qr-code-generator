import React from "react";
import timeIcon from "../../../icons/time.svg";
import officeIcon from "../../../icons/office.svg";
import educationIcon from "../../../icons/education.svg";
import TypeLabel from "./TypeLabel";
import { Box } from "@mui/material";
import "./styles.css";
const ExperienceDiv = ({
  experience,
  fresher,
  current_company_name,
  current_company_jobTitle,
  qualification,
  passing_year,
  institute,
  doingIntern,
}) => {
  return (
    <Box
      sx={{
        margin: "10px 8px",
        fontSize: "8.5px",
        fontWeight: "600",
        lineHeight: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {fresher === "no" ? (
          <>
            <img src={timeIcon} alt="time" height="10px" width="10px" />

            <span className={experience === "Total Exp." ? "lowOpacity" : "normalOpacity"}>
              {experience}
              {Number(experience) ? " yrs" : ""}
            </span>
          </>
        ) : (
          <></>
        )}
        <TypeLabel fresher={fresher} experience={experience} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "7px",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        {fresher === "no" ? (
          <>
            <img src={officeIcon} alt="office" height="10px" width="10px" />
            {/* span with opacity 0.5 on focus 1 */}

            <span className={current_company_name === "Company Name" ? "lowOpacity" : "normalOpacity"}>
              {current_company_name}
            </span>
          </>
        ) : (
          <>
            {doingIntern === "yes" ? (
              <>
                <img src={officeIcon} alt="office" height="10px" width="10px" />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", width: "120px", height: "30px" }}>
                  <span style={{ fontSize: "7px", fontWeight: "600" }}>Internship</span>
                  <span>
                    <span className={current_company_jobTitle === "Months" ? "lowOpacity" : "normalOpacity"}>
                      {current_company_jobTitle}
                    </span>{" "}
                    at{" "}
                    <span className={current_company_name === "Company Name" ? "lowOpacity" : "normalOpacity"}>
                      {current_company_name}
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "7px",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <img src={educationIcon} alt="education" height="10px" width="10px" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            width: "120px",
            border: "1px sollid red",
            height: "20px",
          }}
        >
          <span>
            <span className={qualification === "Qualification" ? "lowOpacity" : "normalOpacity"}>{qualification}</span>{" "}
            <span className={passing_year === "Passing Year" ? "lowOpacity" : "normalOpacity"}>({passing_year})</span>
          </span>
          <span style={{ fontSize: "8px", fontWeight: "600", wordBreak: "break-all" }}>{institute}</span>
        </div>
      </div>
    </Box>
  );
};

export default ExperienceDiv;
