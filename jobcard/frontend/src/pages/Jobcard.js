// just show jobardhere

import { Typography } from "@mui/material";
import JobCardComponent from "../component/JobCardComponent";

function JobCard() {
  return (
    <>
      <Typography variant="h1" color="pink" textAlign="center">
        Job Card
      </Typography>
      <JobCardComponent />
    </>
  );
}

export default JobCard;
