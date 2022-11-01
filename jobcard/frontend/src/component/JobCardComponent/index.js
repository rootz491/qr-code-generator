// import "./styles.css";
import candidate from "./demo.json";
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

export default function JobCard({ formState }) {
  const RenderExperience = () => {
    if (formState.experience === "Experienced") {
      return (
        <div className="location">
          <img src={immediate_join} alt="location" height="12px" width="12px" />
          <span className="locationText">Not in Notice Period</span>
        </div>
      );
    } else if (formState.experience === "Experienced and currently serving notice period") {
      return (
        <div className="location">
          <img src={immediate_join} alt="location" height="12px" width="12px" />
          <span className="locationText">Serving Notice Period</span>
        </div>
      );
    } else if (formState.experience === "Experienced and already serving notice period") {
      return (
        <div className="location">
          <img src={immediate_join} alt="location" height="12px" width="12px" />
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
          <span className="locationText">Can't Relocate to Dehradun</span>
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
          <img src={circle} alt="location" height="12px" width="12px" />
          <span className="locationText">Work from Remote</span>
        </div>
      );
    } else if (formState.workingremote === "no") {
      return (
        <div className="location">
          <img src={circle} alt="location" height="12px" width="12px" />
          <span className="locationText">Work from Office/Hybrid</span>
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
    <Card className="jobcard">
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

      <div style={{ display: "flex" }}>
        <SalaryDiv
          formState={formState}
          current_ctc={salaryFormmater(formState.currCTC) || "not filled"}
          current_inhand={salaryFormmater(formState.currInHandCTC) || "not filled"}
          expected_inhand={salaryFormmater(formState.expectedSalary) || "not filled"}
          offered_ctc={salaryFormmater(formState.offeredCTC) || "not filled"}
        />
        <Divider />
        <div
          style={{
            width: "135px",
            height: "150px",
            marginLeft: "15px",
            marginTop: "-20px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <CurrentOfficeCity current_office_city={formState.currLocation} />
          {WorkLocation()}
          {Relocate()}
          {RenderExperience()}
        </div>
      </div>
      <MessageDiv message={formState.message || 'Any message for us'} />
    </Card>
  );
}
