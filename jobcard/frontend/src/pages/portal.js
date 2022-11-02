import { Stack } from "@mui/material";
import { useState } from "react";
import FormComponent from "../component/FormComponents";
import JobCardComponent from "../component/JobCardComponent";
import "../component/JobCardComponent/index.css";

function Portal() {
  // gobal state for form to pass to jobcard

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
  return (
    <>
      <Stack direction="row" sx={{ height: "100vh" }}>
        <Stack sx={{ width: "50%", height: "100%", overflowY: "scroll" }} alignItems="center">
          <FormComponent setFormState={setFormState} formState={formState}  />
        </Stack>
        <Stack sx={{ flex: 1, height: "100%", overflow: "hidden" }} justifyContent="center" alignItems="center">
          <JobCardComponent formState={formState} />
        </Stack>
      </Stack>
    </>
  );
}

export default Portal;

// todo
//  message area -> text area
//  show resume pdf in card if click can view the pdf
//  notice period at render-experienced and onlyf for "experience" === "experienced"
// qualification -> instute name
//  if fresher -> current company name 