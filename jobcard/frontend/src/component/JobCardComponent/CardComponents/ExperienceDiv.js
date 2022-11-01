import React from 'react';
import timeIcon from '../../../icons/time.svg';
import officeIcon from "../../../icons/office.svg";
import educationIcon from "../../../icons/education.svg";
import TypeLabel from './TypeLabel';

const ExperienceDiv = ({ experience, fresher, current_company_name, qualification, passing_year }) => {
  return (
    <div className="generalInfo">
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={timeIcon} alt="time" height="10px" width="10px" />
        <span>{experience}yrs</span>
        <TypeLabel fresher={fresher} experience={experience} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={officeIcon} alt="office" height="10px" width="10px" />
        <span>{current_company_name}</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={educationIcon} alt="education" height="10px" width="10px" />
        <span>
          {qualification} ({passing_year})
        </span>
      </div>
    </div>
  );
};

export default ExperienceDiv
