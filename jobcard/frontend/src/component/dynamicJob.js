import JobCard from "./JobCardComponent";
import { useEffect, useState } from "react";

const DynamicJob = () => {
  const [formState, setFormState] = useState({
    experience: "Fresher",
    jobtitle: "",
    fullname: "",
    email: "",
    mobilenum: "",
    qualification: "",
    passingYear: "",
    totalexperience: null,
    currCompany: "",
    currCTC: "",
    currInHandCTC: "",
    offeredCTC: "",
    expectedSalary: "",
    noticePeriod: "",
    lastWorkDay: "",
    joiningDate: "",
    currLocation: "",
    currWFHLocation: "",
    message: "",
    relocate: "",
    workingremote: "",
    resume: null,
  });

  useEffect(() => {
    //  get the job id from the url
    const id = window.location.pathname.split("/")[1];
    console.log(id);
    //  TODO fetch from API
    const clientInfos = localStorage.getItem("clientInfos");
    const clientInfosParsed = JSON.parse(clientInfos);
    const job = clientInfosParsed.find((job) => job.id === Number(id));
    setFormState(job);
    // console.log(job);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <JobCard formState={formState} />
    </div>
  );
};

export default DynamicJob;
