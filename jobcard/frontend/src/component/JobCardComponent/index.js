// import "./styles.css";
import candidate from "./demo.json";
// import divider from "../../icons/line.svg";
import CardHeader from "./CardComponents/CardHeader";
import ExperienceDiv from "./CardComponents/ExperienceDiv";
import ContactDiv from "./CardComponents/ContactDiv";
import SalaryDiv from "./CardComponents/SalaryDiv";
import MessageDiv from "./CardComponents/MessageDiv";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const jobCardStyles = makeStyles({
  jobCard: {
    position: "absolute",
    margin: "5%",
    padding: "0",
    width: "300px",
    height: "420px",
    backgroundColor: "#efefef !important",
    // borderRadius: "10px",

    // border: "1px solid #d3d3d3",
    color: "#000",
    overflow: "hidden",
    transform: "scale(1.3)",
    fontFamily: "Poppins, sans-serif",
    fontSize: "10px",
  },
  watermark: {
    position: "absolute",
    top: "38%",
    left: "1%",
    transform: "scale(1.12)",
    color: "#faf9f9",
    fontSize: "90px",
    fontWeight: "bold",
    zIndex: "-1",
  },
  jobTitle: {
    margin: "12px",
    fontSize: "13px",
    lineHeight: "15px",
    color: "rgba(0, 0, 0, 0.5)",
  },
});

export default function JobCard() {
  const classes = jobCardStyles();

  const JobTitle = () => {
    return (
      <Typography fontWeight={700} className={classes.jobTitle}>
        {candidate.job_title}
      </Typography>
    );
  };

  // const Divider = () => {
  //   return <img src={divider} alt="divider" style={{ margin: "0", width: "164px", transform: "rotate(90deg)" }} />;
  // };

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
      <SalaryDiv current_ctc={candidate.current_ctc} current_inhand={candidate.current_inhand} expected_inhand={candidate.expected_inhand} />
      <MessageDiv />
    </Card>
  );
}
