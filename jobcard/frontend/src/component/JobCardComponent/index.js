import "./styles.css";
import candidate from "./demo.json";
import mailIcon from "../../icons/mail.svg";
import callIcon from "../../icons/call.svg";
import timeIcon from "../../icons/time.svg";
import officeIcon from "../../icons/office.svg";
import educationIcon from "../../icons/education.svg";
import moneyIcon from "../../icons/money.svg";
import divider from "../../icons/line.svg";

export default function JobCard() {
  const WaterMark = () => {
    return <span className="watermark">Yugam</span>;
  };

  const CardHeader = () => {
    return (
      <div className="cardHeader">
        <p className="name">{candidate.name}</p>
      </div>
    );
  };

  const TypeLabel = ({ fresher, experience }) => {
    if (fresher === "no" && experience.length) {
      return <span className="expLabel">Experience</span>;
    } else if (fresher === "yes" && experience === "0") {
      return <span className="fresherLabel">Fresher</span>;
    }
  };

  const ContactDiv = () => {
    return (
      <div className="contactDiv">
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <img src={mailIcon} alt="mail" />
          <span className="email">{candidate.email}</span>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <img src={callIcon} alt="call" />
          <span className="mobile">{candidate.mobile}</span>
        </div>
      </div>
    );
  };

  const GeneralInfo = () => {
    return (
      <div className="generalInfo">
        <div
          style={{
            display: "flex",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img src={timeIcon} alt="time" height="10px" width="10px" />
          <span>{candidate.experience}yrs</span>
          <TypeLabel
            fresher={candidate.fresher}
            experience={candidate.experience}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img src={officeIcon} alt="office" height="10px" width="10px" />
          <span>{candidate.current_company_name}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img src={educationIcon} alt="education" height="10px" width="10px" />
          <span>
            {candidate.qualification} ({candidate.passing_year})
          </span>
        </div>
      </div>
    );
  };

  const SalaryDiv = () => {
    return (
      <div className="salaryDiv">
        <div style={{ display: "flex", gap: "7px" }}>
          <img src={moneyIcon} alt="money" height="10px" width="10px" />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span>Current CTC</span>
            <span className="exampleText">(in L/yr Ex-4L,20L)</span>
          </div>
          <span className="salaryText">{candidate.current_ctc}L</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "7px" }}>
            <img src={moneyIcon} alt="money" height="10px" width="10px" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <span>Current In-hand</span>
              <span className="exampleText">(in K/month Ex-20K,65K)</span>
            </div>
            <span className="salaryText">{candidate.current_inhand}K</span>
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            <img src={moneyIcon} alt="money" height="10px" width="10px" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <span>Expected In-hand</span>
              <span className="exampleText">(in K/month Ex-20K,65K)</span>
            </div>
            <span className="salaryText">{candidate.expected_inhand}K</span>
          </div>
        </div>
      </div>
    );
  };

  const Divider = () => {
    return (
      <img
        src={divider}
        alt="divider"
        style={{ margin: "10px", width: "280px" }}
      />
    );
  };

  const MessageDiv = () => {
    return (
      <div className="messageDiv">
        <span className="messageTitle">Any message for us ?</span>
      </div>
    );
  };

  return (
    <div className="jobCard">
      <WaterMark />
      <CardHeader />
      <p className="jobTitle">{candidate.job_title}</p>
      <ContactDiv />
      <GeneralInfo />
      <SalaryDiv />
      <Divider />
      <MessageDiv />
    </div>
  );
}
