import React from "react";
import { useState, useEffect } from "react";
import { Button, FormControl, MenuItem, Paper, Select, Slider, Typography } from "@mui/material";
import JobCard from "./JobCardComponent";
import { isAuthenticated } from "../services/auth";
import { errorToast } from "../utils/toast";
import http from "../services/http";
import { Link } from "react-router-dom";

function Jobs() {
  const [clientInfos, setClientInfos] = useState([]);
  const [clientInfosCopy, setClientInfosCopy] = useState([]);
  const [category, setCategory] = React.useState("All");
  const [jobTitle, setJobTitle] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [value, setValue] = React.useState(5);

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  function handleGetAllUser() {
    const isAuth = isAuthenticated();
    if (isAuth) {
      http
        .get("/api/auth/get-all-user")
        .then((res) => {
          console.log(res.data);
          setClientInfos(res.data);
          setClientInfosCopy(res.data);
        })
        .catch((err) => {
          errorToast(err?.response?.data?.message);
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleGetAllUser();
  }, []);

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
    },
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

  const filterByJobTitle = (title) => {
    if (title.toLowerCase() === "all") setClientInfos(clientInfosCopy);
    else {
      setClientInfos(clientInfosCopy.filter((client) => client.jobtitle?.toLowerCase() === title.toLowerCase()));
    }
  };

  const filterByCategory = (category) => {
    if (category.toLowerCase() === "all") setClientInfos(clientInfosCopy);
    else {
      setClientInfos(
        clientInfosCopy.filter((client) => client?.feedback?.status?.toLowerCase() === category?.toLowerCase())
      );
    }
  };

  const filterByExperience = (exp) => {
    if (exp.toLowerCase() === "all") setClientInfos(clientInfosCopy);
    else {
      setClientInfos(clientInfosCopy.filter((client) => client?.experience?.toLowerCase() === exp?.toLowerCase()));
    }
  };
  const resetFilters = () => {
    setClientInfos(clientInfosCopy);
  };

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
    setCategory(event.target.value);
    filterByCategory(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
    filterByJobTitle(event.target.value);
  };

  const handleTypeChange = (event) => {
    filterByExperience(event.target.value);
    setType(event.target.value);
  };

  // useEffect(() => {
  // const fetchClientInfos = localStorage.getItem("clientInfos") ?? [];
  // setClientInfos(JSON.parse(fetchClientInfos));
  // log all states
  // }, [category, jobTitle, type]);

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
          elevation={2}
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
              <Select
                hiddenLabel
                id="demo-simple-select"
                value={category}
                onChange={handleCategoryChange}
                label="Age"
                name="category"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="selected">Selected</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="button" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Job Title
            </Typography>
            <FormControl fullWidth variant="filled" size="small">
              <Select
                hiddenLabel
                id="demo-simple-select"
                value={jobTitle}
                onChange={handleJobTitleChange}
                label="Age"
                name="jobTitle"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Frontend developer">Frontend developer</MenuItem>
                <MenuItem value="Fullstack developer">Fullstack Developer</MenuItem>
                <MenuItem value="UI/UX designer">UI/UX Designer</MenuItem>
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
                <MenuItem value="Experienced">Experience</MenuItem>
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
              valueLabelDisplay="auto"
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
              valueLabelDisplay="auto"
            />
            <Typography
              variant=""
              display="block"
              gutterBottom
              sx={{ background: "#F0F0F0", width: "max-content", padding: "5px 10px" }}
            >
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
              valueLabelDisplay="auto"
            />
          </div>
          {/* button for reset filter */}
          <Button
            variant="contained"
            size="small"
            sx={{ background: "#F0F0F0", color: "#000000" }}
            onClick={resetFilters}
          >
            {" "}
            Reset Filter{" "}
          </Button>
        </Paper>
      </div>
      {clientInfos.length > 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flex: 1,
            gap: "20px",
            flexWrap: "wrap",
            padding: "40px",
            // marginLeft: "90px",
            boxSizing: "border-box",
            overflowY: "scroll",
            height: "100%",
          }}
        >
          {clientInfos.map((client, index) => (
            // lists of all jobcards
            // filter based on  jobtitle
            <Link to={`/${client._id}`} key={index} style={{textDecoration: "none"}}>
              <div style={{ margin: "0" }}>
                {/* only show those jobcard whose client.jobtitle === Jobtitle or else show all jobcards */}
                <JobCard formState={client} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1>No jobs applicants available</h1>
      )}
    </div>
  );
}

export default Jobs;
