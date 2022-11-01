// import "./styles.css";
import candidate from "./demo.json";
import divider from "../../icons/line.svg";
import CardHeader from "./CardComponents/CardHeader";
import ExperienceDiv from "./CardComponents/ExperienceDiv";
import ContactDiv from "./CardComponents/ContactDiv";
import SalaryDiv from "./CardComponents/SalaryDiv";
import MessageDiv from "./CardComponents/MessageDiv";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import location from "../../icons/location.svg";
import circle from "../../icons/circle.svg";
import check_circle from "../../icons/check_circle.svg";
import immediate_join from "../../icons/immediate_join.svg";

const jobCardStyles = makeStyles({
  jobCard: {
    position: "relative",
    // margin: "12% 10%",
    padding: "0",
    width: "300px",
    height: "420px",
    color: "#000",
    overflow: "hidden",
    // transform: "scale(1.4)",
    fontFamily: "Poppins, sans-serif",
    fontSize: "8px",
    lineHeight: "10px",
    fontWeight: "300",
  },
  jobTitle: {
    margin: "10px 8px",
    fontSize: "13px",
    fontWeight: "700",
    lineHeight: "15px",
    color: "rgba(0, 0, 0, 0.4)",
  },
  divider: {
    position: "absolute",
    top: "95px",
    left: "146px",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  locationText: {
    fontSize: "9px",
    fontWeight: "700",
    lineHeight: "10px",
  },
});

export default function JobCard() {
  const classes = jobCardStyles();

  const JobTitle = () => {
    return <div className={classes.jobTitle}>{candidate.job_title}</div>;
  };

  const Divider = () => {
    return <img src={divider} alt="divider" className={classes.divider} />;
  };

  const CurrentOfficeCity = ({ current_office_city }) => {
    return (
      <div className={classes.location}>
        <img src={location} alt="location" height="12px" width="12px" />
        <span className={classes.locationText}>{current_office_city}</span>
      </div>
    );
  };

  return (
    <Card className={classes.jobCard}>
      <CardHeader name={candidate.name} />
      <JobTitle />
      <ContactDiv email={candidate.email} mobile={candidate.mobile} />
      <ExperienceDiv
        experience={candidate.experience}
        fresher={candidate.fresher}
        current_company_name={candidate.current_company_name}
        qualification={candidate.qualification}
        passing_year={candidate.passing_year}
      />
      <div style={{ display: "flex" }}>
        <SalaryDiv current_ctc={candidate.current_ctc} current_inhand={candidate.current_inhand} offered_ctc={candidate.offered_ctc} expected_ctc={candidate.expected_ctc} />
        <Divider />
        <div style={{ width: "135px", height: "150px", marginLeft: "15px", marginTop: "-20px", display: "flex", flexDirection: "column", gap: "5px" }}>
          <CurrentOfficeCity current_office_city={candidate.current_office_city} />
          <div className={classes.location}>
            <img src={circle} alt="location" height="12px" width="12px" />
            <span>Work from Office/Hybrid</span>
          </div>
          <div className={classes.location}>
            <img src={check_circle} alt="location" height="12px" width="12px" />
            <span className={classes.locationText}>Ok to Relocate Dehradun</span>
          </div>
          <div className={classes.location}>
            <img src={immediate_join} alt="location" height="12px" width="12px" />
            <span className={classes.locationText}>Immediate Joinee</span>
          </div>
        </div>
      </div>
      <MessageDiv />
    </Card>
  );
}
