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
import moment from "moment";

export default function JobCard({ formState }) {
	const NoticePeriod = () => {
		if (formState.experience && formState.noticePeriod) {
			return (
				<span className="noticePeriodText">
					({formState.noticePeriod} months)
				</span>
			);
		}
	};

	const LastWorkDate = () => {
		const stringLastDate = formState.lastWorkDay.replace(/-/g, "");
		if (
			(formState.experience ===
				"Experienced and already served notice period" ||
				formState.experience ===
					"Experienced and currently serving notice period") &&
			formState.lastWorkDay
		) {
			return (
				<div className="dateDiv">
					<div className="datesLeft">
						<img src={calender} alt="calender" width="12px" height="12px" />
						<span className="dateLabel">Last Work Day</span>
					</div>
					<div className="datesRight">
						<div>
							<span className="date">
								{moment(stringLastDate).format("D MMM YY")}
							</span>
						</div>
						<div>
							<span className="dateText">
								({moment(stringLastDate, "YYYYMMDD").fromNow()})
							</span>
						</div>
					</div>
				</div>
			);
		}
	};

	const JoiningDate = () => {
		const stringJoiningDate = formState.joiningDate.replace(/-/g, "");

		if (
			(formState.experience ===
				"Experienced and already served notice period" ||
				formState.experience ===
					"Experienced and currently serving notice period" ||
				formState.experience === "Fresher") &&
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
							<span className="date">
								{moment(stringJoiningDate).format("D MMM YY")}
							</span>
						</div>
						<div>
							<span className="dateText">
								({moment(stringJoiningDate, "YYYYMMDD").fromNow()})
							</span>
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
					<img
						src={not_in_notice_period}
						alt="not_in_notice_period"
						height="12px"
						width="12px"
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "3px",
							alignItems: "flex-start",
						}}
					>
						<span className="locationText">Not in notice period</span>
						{NoticePeriod()}
					</div>
				</div>
			);
		} else if (
			formState.experience === "Experienced and currently serving notice period"
		) {
			return (
				<div className="location">
					<img src={serving} alt="serving" height="12px" width="12px" />
					<span className="locationText">Serving Notice Period</span>
				</div>
			);
		} else if (
			formState.experience === "Experienced and already served notice period"
		) {
			return (
				<div className="location">
					<img
						src={immediate_join}
						alt="immediate_join"
						height="12px"
						width="12px"
					/>
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
					<span className="locationText">Working from Remote</span>
				</div>
			);
		} else if (formState.workingremote === "no") {
			return (
				<div className="location">
					<img src={circle} alt="location" height="12px" width="12px" />
					<span>Working from Office/Hybrid</span>
				</div>
			);
		} else {
			return <></>;
		}
	};

	const JobTitle = () => {
		return (
			<div className="jobTitle">
				{formState.jobtitle || "Applicant Position"}
			</div>
		);
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

	// Nikhil not deleting legacy code
	// const salaryFormmater = (salary) => {
	//     let stringSalary = salary.toString();
	//     if (stringSalary.length === 4) {
	//       // round off to 1 decimal place
	//       return stringSalary.slice(0, 1) + "." + stringSalary.slice(1, 2) + " K";
	//     } else if (stringSalary.length === 5) {
	//       return stringSalary.slice(0, 2) + " K";
	//     } else if (stringSalary.length === 6) {
	//       const slicedSal = stringSalary.slice(0, 2);
	//       return slicedSal.slice(0, 1) + "." + slicedSal.slice(1, 2) + " L";
	//     } else if (stringSalary.length === 7) {
	//       return stringSalary.slice(0, 2) + " L";
	//     } else if (stringSalary.length === 8) {
	//       const slicedSal = stringSalary.slice(0, 3);
	//       return slicedSal.slice(0, 1) + "." + slicedSal.slice(1, 2) + " Cr";
	//     } else if (stringSalary.length === 9) {
	//       return stringSalary.slice(0, 2) + " Cr";
	//     } else {
	//       return salary;
	//     }
	//   }
	// };

	const Salary = (value) => {
		// use Intl to format salary

		const salary = new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			notation: "compact",
			maximumFractionDigits: 0,
		}).format(parseInt(value || 0));
		return salary;
	};

	return (
		<Card className="jobCard">
			<CardHeader name={formState.fullname || "Applicant Name"} />
			<JobTitle />
			<ContactDiv
				email={formState.email || "Email"}
				mobile={formState.altmobilenum || "Mobile Number"}
			/>
			<ExperienceDiv
				experience={formState.totalexperience || "Total Exp."}
				fresher={formState.experience === "Fresher" ? "yes" : "no"}
				current_company_name={formState.currCompany || "Current Company Name"}
				qualification={formState.qualification || "Qualification"}
				passing_year={formState.passingYear || "Passing Year"}
				institute={formState.institute}
				current_company_jobTitle={formState.prevJobTitle || "Job title?"}
			/>

			<div style={{ display: "flex" }}>
				<SalaryDiv
					formState={formState}
					current_ctc={Salary(formState.currCTC)}
					current_inhand={Salary(formState.currInHandCTC)}
					expected_inhand={Salary(formState.expectedSalary)}
					offered_ctc={Salary(formState.offeredCTC)}
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
						marginTop: formState.experience === "Fresher" ? "-69px" : "-50px",
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
			<MessageDiv
				message={formState.message}
				experience={formState.experience}
			/>
		</Card>
	);
}
