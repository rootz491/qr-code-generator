import JobCard from "./JobCardComponent";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { saveUserFeedback } from "../services/user";
import { getUserType, isAuthenticated } from "../services/auth";
import { errorToast } from "../utils/toast";
import http from "../services/http";

const DynamicJob = () => {
  const [formState, setFormState] = useState({
    experience: "Fresher",
    jobtitle: "",
    fullname: "",
    email: "",
    altmobilenum: "",
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

  const [adminData, setAdminData] = useState({
    comment: "",
    status: "",
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(adminData);
    saveUserFeedback(adminData, formState._id);
  };

  function handelGetUser(id) {
    if (isAuthenticated()) {
      if (getUserType() === "admin") {
        http
          .get("/api/auth/user/" + id)
          .then((res) => {
            console.log(res);
            setFormState(res.data);
            // successToast("User Saved Successfully");
          })
          .catch((err) => {
            errorToast(err?.response?.data?.message);
            console.log(err);
          });
      } else {
        errorToast("You are not authorized to perform this action");
      }
    }
  }

  useEffect(() => {
    //  get the job id from the url
    const id = window.location.pathname.split("/")[1];
    console.log(id);
    handelGetUser(id);
  }, []);

  return (
    <Stack
      style={{
        display: "flex",
        height: "100vh",
      }}
      direction="row"
    >
      <Stack sx={{ height: "100%", overflow: "auto", width: "50%" }} justifyContent="center" alignItems="center">
        <JobCard formState={formState} />
      </Stack>
      <Stack sx={{ height: "100%", overflow: "auto", flex: 1, padding: "0 20px" }} justifyContent="center" spacing={5}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="any comments"
          onChange={handleChange}
          name="comment"
          value={adminData.comment}
        />
        {/* mui select */}
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            label="status"
            onChange={handleChange}
            name="status"
            value={adminData.status}
          >
            <MenuItem value={"rejected"}>Rejected</MenuItem>
            <MenuItem value={"selected"}>Selected</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {" "}
          Save{" "}
        </Button>
      </Stack>
    </Stack>
  );
};

export default DynamicJob;
