import { Stack } from "@mui/material";
import { useState } from "react";
import FormComponent from "../component/FormComponents";
import JobCardComponent from "../component/JobCardComponent";
import "../component/JobCardComponent/index.css";

function Portal() {
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
    institute: "",
    prevJobTitle: "",
  });

  return (
    <>
      <Stack direction="row" sx={{ height: "100vh" }}>
        <Stack sx={{ width: "50%", height: "100%", overflowY: "scroll" }} alignItems="center">
          <FormComponent setFormState={setFormState} formState={formState} />
        </Stack>
        <Stack sx={{ flex: 1, height: "100%", overflow: "hidden" }} justifyContent="center" alignItems="center">
          <div style={{ width: "fit-content", scale: "1.5" }}>
            <JobCardComponent formState={formState} />
          </div>
        </Stack>
      </Stack>
    </>
  );
}

export default Portal;
