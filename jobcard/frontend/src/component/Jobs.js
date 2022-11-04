import React from "react";
import { useState, useEffect } from "react";
import { FormControl, MenuItem, Paper, Select, Slider, Typography } from "@mui/material";
import JobCard from "./JobCardComponent";

function Jobs() {
  const [clientInfos, setClientInfos] = useState([]);
  const [category, setCategory] = React.useState("All");
  const [jobTitle, setJobTitle] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [value, setValue] = React.useState(5);

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

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
    }
  ];

  function joiningLabelFormat(joiningvalue) {
    const units = ["days", "month"];

    let unitIndex = 0;
    let scaledValue = joiningvalue;

    while (scaledValue >= 90 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 30;
    }

    return `${Math.round(scaledValue * 10) / 10} ${units[unitIndex]}`;
  }

  function calculateValue(joiningvalue) {
    return joiningvalue;
  }


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
    return `${value}`;
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
            <Slider
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "12px",
                },
              }}
              size="small"
              aria-label="Experience"
              defaultValue={15}
              getAriaValueText={valuetext}
              min={0}
              max={20}
              step={1}
              marks={exp}
              valueLabelDisplay="off"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Can join within
            </Typography>
            <Slider
              value={value}
              onChange={handleSliderChange}
              sx={{
                "& .MuiSlider-markLabel": {
                  display: "none",
                },
              }}
              size="small"
              aria-label="Joining Date"
              defaultValue={70}
              scale={calculateValue}
              getAriaValueText={joiningLabelFormat}
              valueLabelFormat={joiningLabelFormat}
              min={0}
              max={90}
              step={5}
              marks={joiningDate}
              valueLabelDisplay="off"
            />
            <Typography variant="" display="block" gutterBottom sx={{ background: "#F0F0F0", width: "max-content", padding: "5px 10px" }}>
              {joiningLabelFormat(calculateValue(value))}
            </Typography>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Expected CTC
            </Typography>
            <Slider
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "12px",
                },
              }}
              size="small"
              aria-label="Expected CTC"
              defaultValue={35}
              getAriaValueText={valuetext}
              min={0}
              max={50}
              step={5}
              marks={ctc}
              valueLabelDisplay="off"
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
