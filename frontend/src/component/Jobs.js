import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  Typography,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import JobCard from "./JobCardComponent";
import { isAuthenticated } from "../services/auth";
import { errorToast } from "../utils/toast";
import http from "../services/http";
import { Link } from "react-router-dom";
import { Cancel, CheckCircle, OfflinePin, Preview, RadioButtonChecked } from "@mui/icons-material";
import { Box } from "@mui/system";
import { saveUserFeedback } from "../services/user";

function Jobs() {

  const [adminData, setAdminData] = useState({
    comment: "",
    status: "",
  });

  const handleAdminControlsChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(adminData);
    // saveUserFeedback(adminData, formState._id);
  };

  const [clientInfos, setClientInfos] = useState([]);
  const [clientInfosCopy, setClientInfosCopy] = useState([]);
  const [candidateStage, setCandidateStage] = React.useState("All");
  const [domain, setDomain] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [value, setValue] = React.useState(30);
  const [open, setOpen] = React.useState(false);

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

  const [expValue, setExpValue] = React.useState([10, 15]);
  const handleExpValueChange = (event, newValue, activeThumb) => {
    const minDistance = 2;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setExpValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setExpValue([clamped - minDistance, clamped]);
      }
    } else {
      setExpValue(newValue);
    }
  };

  const [ctcValue, setCtcValue] = React.useState([20, 35]);
  const handleCtcValueChange = (event, newValue, activeThumb) => {
    const minDistance = 2;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setCtcValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setCtcValue([clamped - minDistance, clamped]);
      }
    } else {
      setCtcValue(newValue);
    }
  };

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

  const filterByDomain = (title) => {
    if (title.toLowerCase() === "all") setClientInfos(clientInfosCopy);
    else {
      setClientInfos(clientInfosCopy.filter((client) => client.jobtitle?.toLowerCase() === title.toLowerCase()));
    }
  };

  const filterByCandidateStage = (stage) => {
    console.log(stage);
    if (stage.toLowerCase() === "all") setClientInfos(clientInfosCopy);
    else {
      console.log(clientInfosCopy);
      setClientInfos(
        clientInfosCopy.filter((client) => client?.feedback?.status?.toLowerCase() === candidateStage?.toLowerCase())
      );
      console.log({ clientInfos });
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

  const handleCandidateStageChange = (event) => {
    setCandidateStage(event.target.value);
    filterByCandidateStage(event.target.value);
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
    filterByDomain(event.target.value);
  };

  const handleTypeChange = (event) => {
    filterByExperience(event.target.value);
    setType(event.target.value);
  };

  const handleOpenClose = () => {
    // only open the one which is clicked and close the other
    setOpen(!open);
  };

  // useEffect(() => {
  // const fetchClientInfos = localStorage.getItem("clientInfos") ?? [];
  // setClientInfos(JSON.parse(fetchClientInfos));
  // log all states
  // }, [category, domain, type]);

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
            <Typography variant="body2" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Candidate Stages
            </Typography>
            <FormControl fullWidth variant="filled" size="small">
              <Select
                hiddenLabel
                id="demo-simple-select"
                value={candidateStage}
                onChange={handleCandidateStageChange}
                label="candidateStage"
                name="candidateStage"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Review In Progress">Review In Progress</MenuItem>
                <MenuItem value="Okay To Interview">Okay To Interview</MenuItem>
                <MenuItem value="Selected">Selected</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="body2" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Domain
            </Typography>
            <FormControl fullWidth variant="filled" size="small">
              <Select
                hiddenLabel
                id="demo-simple-select"
                value={domain}
                onChange={handleDomainChange}
                label="domain"
                name="domain"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Frontend developer">Frontend developer</MenuItem>
                <MenuItem value="Fullstack developer">Fullstack Developer</MenuItem>
                <MenuItem value="UI/UX designer">UI/UX Designer</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="body2" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
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
            <Typography variant="body2" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Experience
            </Typography>
            <Slider
              sx={{
                marginTop: "20px",
                "& .MuiSlider-markLabel": {
                  fontSize: "12px",
                },
              }}
              value={expValue}
              onChange={handleExpValueChange}
              size="small"
              defaultValue={15}
              getAriaValueText={valuetext}
              min={0}
              max={20}
              step={1}
              marks={exp}
              valueLabelDisplay="on"
            />
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography variant="body2" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
                Can join within
              </Typography>
              <Typography
                variant=""
                display="block"
                gutterBottom
                sx={{ background: "#F0F0F0", width: "max-content", padding: "5px 10px" }}
              >
                {joiningLabelFormat(calculateValue(value))}
              </Typography>
            </div>
            <Slider
              value={value}
              onChange={handleSliderChange}
              sx={{
                marginTop: "25px",
                "& .MuiSlider-markLabel": {
                  display: "none",
                },
              }}
              size="small"
              defaultValue={70}
              scale={calculateValue}
              getAriaValueText={joiningLabelFormat}
              valueLabelFormat={joiningLabelFormat}
              min={0}
              max={90}
              step={1}
              marks={joiningDate}
              valueLabelDisplay="on"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Typography variant="body2" display="block" gutterBottom sx={{ fontWeight: "bold" }}>
              Expected CTC
            </Typography>
            <Slider
              sx={{
                marginTop: "20px",
                "& .MuiSlider-markLabel": {
                  fontSize: "12px",
                },
              }}
              value={ctcValue}
              onChange={handleCtcValueChange}
              size="small"
              defaultValue={35}
              getAriaValueText={valuetext}
              min={0}
              max={50}
              step={1}
              marks={ctc}
              valueLabelDisplay="on"
            />
          </div>
          {/* button for reset filter */}
          <Button variant="outlined" size="small" sx={{ width: "100%" }} onClick={handleOpenClose}>
            {" "}
            Toggle Comments Section{" "}
          </Button>
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
            <JobCardLocal key={index} client={client} open={open} />
          ))}
        </div>
      ) : (
        <h1>No jobs applicants available</h1>
      )}
    </div>
  );
}

export default Jobs;

const JobCardLocal = ({ client, index, open }) => {
  const [comment, setComment] = React.useState(client.feedback.comment);
  const [status, setStatus] = React.useState(client.feedback.status);

  return (
    <Box spacing={2} key={index}>
      <Link to={`/${client._id}`} key={index} style={{ textDecoration: "none" }}>
        <div style={{ margin: "0" }}>
          {/* only show those jobcard whose client.jobtitle === Jobtitle or else show all jobcards */}
          <JobCard formState={client} />
        </div>
      </Link>
      <Stack overflow="auto" direction="row" sx={{ marginTop: "10px" }} justifyContent="space-between">
        <IconButton title="Rejected" onClick={() => setStatus("Rejected")}>
          <Cancel />
        </IconButton>
        <IconButton title="Selected" onClick={() => setStatus("Selected")}>
          <OfflinePin />
        </IconButton>
        <IconButton title="Okay to interview" onClick={() => setStatus("Okay To Interview")}>
          <CheckCircle />
        </IconButton>
        <IconButton title="Review in progress" onClick={() => setStatus("Review In Progress")}>
          <Preview />
        </IconButton>
        <IconButton title="Applied" onClick={() => setStatus("Applied")}>
          <RadioButtonChecked />
        </IconButton>
      </Stack>
      {open && (
        <Box>
          <TextareaAutosize
            minRows={10}
            placeholder="any comments"
            name="comment"
            style={{ width: "100%" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            sx={{ fontSize: "12px" }}
            onClick={() =>
              saveUserFeedback(
                {
                  comment,
                  status,
                },
                client._id
              )
            }
          >
            Save and Post
          </Button>
        </Box>
      )}
    </Box>
  );
};
