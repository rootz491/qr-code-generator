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
  });
  return (
    <>
      <Stack direction="row" sx={{ height: "100vh" }}>
        <Stack sx={{ width: "50%", height: "100%", overflowY: "scroll" }} alignItems="center">
          <FormComponent setFormState={setFormState} formState={formState} />
        </Stack>
        <Stack sx={{ flex: 1 }} justifyContent="center" alignItems="center">
          <JobCardComponent formState={formState} />
        </Stack>
      </Stack>
    </>
  );
}

export default Portal;

// todo
// roles applyin for
// 1. slider for total exp.
// 2. dropdown for fresher, experienced, exp. and currently serving notice period, exp. already served notice period, freelancer,
// 3 .remove Are you a fresher
// 4. remove rating (done)
// 5. . only no. allowed in ctc -> conversion to LPA or K (approx)
// 6. curr .office loca. -curr location
// 7. remove highscool - graduation (done)
//  msgs -> text area

//  are you workin remotely - yes no (if yes then show textfield)
