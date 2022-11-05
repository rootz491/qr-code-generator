// just show jobardhere

import { Typography } from "@mui/material";
import JobCardComponent from "../component/JobCardComponent";

function JobCard() {
  return (
    <>
      <Typography variant="h1" color="pink" textAlign="center">
        Job Card
      </Typography>
      <div style={{ marginTop: "10px", width: "100%", height: "100vh" }}>
        <JobCardComponent />
      </div>
    </>
  );
}

export default JobCard;
