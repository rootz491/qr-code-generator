import { Stack } from "@mui/material";
import { useState } from "react";
import FormComponent from "../component/FormComponents";
import JobCardComponent from "../component/JobCardComponent";

function Portal() {
  // gobal state for form to pass to jobcard

  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    mobilenum: "",
    qualification: "",
    passingYear: "",
    experience: "",
    currCompany: "",
    currCTC: "",
    currInHandCTC: "",
    expectedSalary: "",
    noticePeriod: "",
    lastWorkDay: "",
    currOfficLocation: "",
    currWFHLocation: "",
    highSchool: "",
    graduation: "",
    message: "",
  });
  return (
    <>
      <Stack direction="row" sx={{ height: "100vh" }}>
        <Stack sx={{ width: "50%", height: "100%", overflowY: "scroll" }} alignItems="center">
          <FormComponent setFormState={setFormState} />
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
// 4. Rate rating 
// 5. . only no. allowed in ctc -> conversion to LPA or K (approx)
// 6. curr .office loca. -curr location
// 7. remove highscool - graduation 
//  msgs -> text area