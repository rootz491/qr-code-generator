import React from "react";
import { useState, useEffect } from "react";
import { FormControl, MenuItem, Paper, Select, Slider, Typography } from "@mui/material";
import JobCard from "./JobCardComponent";

function Jobs() {
  const [clientInfos, setClientInfos] = useState([]);
  const [category, setCategory] = React.useState("All");
  const [jobTitle, setJobTitle] = React.useState("All");
  const [type, setType] = React.useState("All");
  const exp = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "20°C",
    },
    {
      value: 10,
      label: "37°C",
    },
    {
      value: 15,
      label: "100°C",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    const fetchClientInfos = localStorage.getItem("clientInfos") ?? [];
    setClientInfos(JSON.parse(fetchClientInfos));
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100vw",
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "20%",
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
          boxSizing: "border-box",
          padding: "20px 20px",
        }}
      >
        <Paper
          elevation="2"
          style={{
            padding: "40px 20px 10px 20px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            // border: "1px solid black",
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Category
            </Typography>
            <FormControl fullWidth variant="filled" size="small">
              <Select hiddenLabel id="demo-simple-select" value={category} onChange={handleCategoryChange} label="Age">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Previewing">Previewing</MenuItem>
                <MenuItem value="Selected">Selected</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Job Title
            </Typography>
            <FormControl fullWidth variant="filled" size="small">
              <Select hiddenLabel id="demo-simple-select" value={jobTitle} onChange={handleJobTitleChange} label="Age">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
                <MenuItem value="Fullstack Developer">Fullstack Developer</MenuItem>
                <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Type
            </Typography>
            <FormControl fullWidth variant="filled" size="small">
              <Select hiddenLabel id="demo-simple-select" value={type} onChange={handleTypeChange} label="Age">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Fresher">Fresher</MenuItem>
                <MenuItem value="Experience">Experience</MenuItem>
                <MenuItem value="Experienced and currently serving notice period">Experienced and currently serving notice period</MenuItem>
                <MenuItem value="Experienced and already served notice period">Experienced and already served notice period</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Experience
            </Typography>
            <Slider aria-label="Always visible" defaultValue={5} getAriaValueText={valuetext} step={20} marks={exp} valueLabelDisplay="on" />
          </div>
        </Paper>
      </div>
      {clientInfos.length > 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "max-content",
            width: "80%",
            gap: "100px",
            flexWrap: "wrap",
            paddingLeft: "50px",
            paddingTop: "60px",
            paddingBottom: "60px",
            paddingRight: "0px",
            // marginLeft: "90px",
            boxSizing: "border-box",
          }}
        >
          {clientInfos.map((client, index) => (
            // lists of all jobcards
            <div key={index} style={{ minHeight: "60vh", transform: "scale(0.8)", margin: "0" }}>
              <JobCard formState={client} />
            </div>
          ))}
        </div>
      ) : (
        <h1>No jobs applicants available</h1>
      )}
    </div>
  );
}

export default Jobs;
