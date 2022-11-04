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
      label: "5yr",
    },
    {
      value: 10,
      label: "10yr",
    },
    {
      value: 15,
      label: "15yr",
    },
    {
      value: 20,
      label: "20+yr",
    },
  ];

  const joiningDate = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5days",
    },
    {
      value: 15,
      label: "10days",
    },
    {
      value: 30,
      label: "1month",
    },
    {
      value: 60,
      label: "2months",
    },
    {
      value: 90,
      label: "3+months",
    },
  ];

  const ctc = [
    {
      value: 1,
      label: "1L",
    },
    {
      value: 5,
      label: "5L",
    },
    {
      value: 10,
      label: "10L",
    },
    {
      value: 20,
      label: "20L",
    },
    {
      value: 40,
      label: "40L",
    },
    {
      value: 50,
      label: "50+L",
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

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
        height: "100vh",
        display: "flex",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
          boxSizing: "border-box",
          height: "100%",
          width: "320px",
        }}
      >
        <Paper
          elevation="2"
          style={{
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
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
                <MenuItem value="Experienced and currently serving notice period">
                  Experienced and currently serving notice period
                </MenuItem>
                <MenuItem value="Experienced and already served notice period">
                  Experienced and already served notice period
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Experience
            </Typography>
            <Slider
              size="small"
              aria-label="Always visible"
              defaultValue={15}
              getAriaValueText={valuetext}
              min={0}
              max={20}
              step={5}
              marks={exp}
              valueLabelDisplay="on"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Joining Date
            </Typography>
            <Slider
              size="small"
              aria-label="Always visible"
              defaultValue={70}
              getAriaValueText={valuetext}
              min={0}
              max={90}
              step={5}
              marks={joiningDate}
              valueLabelDisplay="on"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Expected CTC
            </Typography>
            <Slider
              size="small"
              aria-label="Always visible"
              defaultValue={35}
              getAriaValueText={valuetext}
              min={0}
              max={50}
              step={5}
              marks={ctc}
              valueLabelDisplay="on"
            />
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
            flex: 1,
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
