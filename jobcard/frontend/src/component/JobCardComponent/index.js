import "./styles.css";
import candidate from "./demo.json";
import divider from "../../icons/line.svg";
import CardHeader from "./CardComponents/CardHeader";
import ExperienceDiv from "./CardComponents/ExperienceDiv";
import ContactDiv from "./CardComponents/ContactDiv";
import SalaryDiv from "./CardComponents/SalaryDiv";
import MessageDiv from './CardComponents/MessageDiv';

export default function JobCard() {
  const WaterMark = () => {
    return <span className="watermark">Yugam</span>;
  };

  const Divider = () => {
    return <img src={divider} alt="divider" style={{ margin: "10px", width: "280px" }} />;
  };

  return (
    <div className="jobCard">
      <WaterMark />
      <CardHeader name={candidate.name} />
      <p className="jobTitle">{candidate.job_title}</p>
      <ContactDiv email={candidate.email} mobile={candidate.mobile} />
      <ExperienceDiv
        experience={candidate.experience}
        fresher={candidate.fresher}
        current_company_name={candidate.current_company_name}
        qualification={candidate.qualification}
        passing_year={candidate.passing_year}
      />
      <SalaryDiv current_ctc={candidate.current_ctc} current_inhand={candidate.current_inhand} expected_inhand={candidate.expected_inhand} />
      <Divider />
      <MessageDiv />
    </div>
  );
}
