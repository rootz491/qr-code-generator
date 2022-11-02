import dividerr from "../../icons/line.svg";
import CardHeader from "./CardComponents/CardHeader";
import ExperienceDiv from "./CardComponents/ExperienceDiv";
import ContactDiv from "./CardComponents/ContactDiv";
import SalaryDiv from "./CardComponents/SalaryDiv";
import MessageDiv from "./CardComponents/MessageDiv";
import { Card } from "@mui/material";
import "./index.css";
import Ilocation from "../../icons/location.svg";
import circle from "../../icons/circle.svg";
import check_circle from "../../icons/check_circle.svg";
import immediate_join from "../../icons/immediate_join.svg";
import serving from "../../icons/serving.svg";
import not_in_notice_period from "../../icons/not_in_notice_period.svg";
import calender from "../../icons/calender.svg";

export default function JobCard({ formState }) {

  const NoticePeriod = () => {
    if (formState.experience && formState.noticePeriod) {
      return <span className="noticePeriodText">({formState.noticePeriod} months)</span>;
    }
  }

  const LastWorkDate = () => {
    if ((formState.experience === "Experienced and already serving notice period" || formState.experience === "Experienced and currently serving notice period") && formState.lastWorkDay) {
      return (
        <div className="dateDiv">
          <div className="datesLeft">
            <img src={calender} alt="calender" width="12px" height="12px" />
            <span className="dateLabel">Last Work Day</span>
          </div>
          <div className="datesRight">
            <div>
            <span className="locationText">{formState.lastWorkDay}</span>
            </div>
            <div>
            <span className="dateText">(0 days from now)</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const JoiningDate = () => {
    if (
      (formState.experience === "Experienced and already serving notice period" || formState.experience === "Experienced and currently serving notice period" || formState.experience === "Fresher") &&
      formState.joiningDate
    ) {
      return (
        <div className="dateDiv">
          <div className="datesLeft">
            <img src={calender} alt="calender" width="12px" height="12px" />
            <span className="dateLabel">Joining Date</span>
          </div>
          <div className="datesRight">
            <div>
            <span className="locationText">{formState.joiningDate}</span>
            </div>
            <div>
            <span className="dateText">(0 days from now)</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const RenderExperience = () => {
    if (formState.experience === "Experienced") {
      return (
        <div className="location">
          <img src={not_in_notice_period} alt="not_in_notice_period" height="12px" width="12px" />
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start" }}>
            <span className="locationText">Not in notice period</span>
            {NoticePeriod()}
          </div>
        </div>
      );
    } else if (formState.experience === "Experienced and currently serving notice period") {
      return (
        <div className="location">
          <img src={serving} alt="serving" height="12px" width="12px" />
          <span className="locationText">Serving Notice Period</span>
        </div>
      );
    } else if (formState.experience === "Experienced and already served notice period") {
      return (
        <div className="location">
          <img src={immediate_join} alt="immediate_join" height="12px" width="12px" />
          <span className="locationText">Immediate Joining</span>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const Relocate = () => {
    if (formState.relocate === "no") {
      return (
        <div className="location">
          <img src={circle} alt="location" height="12px" width="12px" />
          <span>Can't Relocate to Dehradun</span>
        </div>
      );
    } else if (formState.relocate === "yes") {
      return (
        <div className="location">
          <img src={check_circle} alt="location" height="12px" width="12px" />
          <span className="locationText">Ok to Relocate Dehradun</span>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const WorkLocation = () => {
    if (formState.workingremote === "yes") {
      return (
        <div className="location">
          <img src={check_circle} alt="location" height="12px" width="12px" />
          <span className="locationText">Work from Remote</span>
        </div>
      );
    } else if (formState.workingremote === "no") {
      return (
        <div className="location">
          <img src={circle} alt="location" height="12px" width="12px" />
          <span>Work from Office/Hybrid</span>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const JobTitle = () => {
    return <div className="jobTitle">{formState.jobtitle || "Applicant Position"}</div>;
  };

  const Divider = () => {
    return <img src={dividerr} alt="divider" className="divider" />;
  };

  const CurrentOfficeCity = ({ current_office_city }) => {
    return (
      <div className="location">
        <img src={Ilocation} alt="location" height="12px" width="12px" />
        <span className="locationText">{current_office_city || "City"}</span>
      </div>
    );
  };

  const salaryFormmater = (salary) => {
    let stringSalary = salary.toString();
    if (stringSalary.length === 4) {
      console.log(stringSalary.slice(0, 1) + "K");
      return stringSalary.slice(0, 1) + "K";
    } else if (stringSalary.length === 5) {
      return stringSalary.slice(0, 2) + "K";
    } else if (stringSalary.length === 6) {
      return stringSalary.slice(0, 1) + "L";
    } else if (stringSalary.length === 7) {
      return stringSalary.slice(0, 2) + "L";
    } else {
      return salary;
    }
  };

  return (
    <Card className="jobCard">
      <CardHeader name={formState.fullname || "Applicant Name"} />
      <JobTitle />
      <ContactDiv email={formState.email || "Email"} mobile={formState.mobilenum || "Mobile Number"} />
      <ExperienceDiv
        experience={formState.totalexperience || "Total Exp."}
        fresher={formState.experience === "Fresher" ? "yes" : "no"}
        current_company_name={formState.currCompany || "Current Company Name"}
        qualification={formState.qualification || "Qualification"}
        passing_year={formState.passingYear || "Passing Year"}
      />

      <div style={{ display: "flex", gap: "15px" }}>
        <SalaryDiv
          formState={formState}
          current_ctc={salaryFormmater(formState.currCTC)}
          current_inhand={salaryFormmater(formState.currInHandCTC)}
          expected_inhand={salaryFormmater(formState.expectedSalary)}
          offered_ctc={salaryFormmater(formState.offeredCTC)}
        />
        <Divider />

        <div
          style={{
            flex: 1,
            padding: "0px 8px",
            height: "170px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            boxSizing: "border-box",
            marginTop: "-40px",
          }}
        >
          <CurrentOfficeCity current_office_city={formState.currLocation} />
          {WorkLocation()}
          {Relocate()}
          {RenderExperience()}
          {LastWorkDate()}
          {JoiningDate()}
        </div>
        </div>
      <MessageDiv message={formState.message} experience={formState.experience}  />
    </Card>
  );
}
