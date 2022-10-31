import { Stack, Box } from "@mui/material";
import FormComponent from "../component/FormComponents";
import JobCardComponent from "../component/JobCardComponent";

function Portal() {
  return (
    <>
      {/* <Typography variant="h1" color="pink" textAlign="center">
        Hello World
      </Typography>
      <Typography variant="body1" color="red" textAlign="center">
        {" "}
        left side form, right side live preview Jobcard
      </Typography> */}
      <Stack direction="row" sx={{ height: "100vh" }}>
        <Stack sx={{ width: "50%", height: "100%", overflowY: "scroll" }} alignItems="center">
          <FormComponent />
        </Stack>
        <Stack sx={{ flex: 1 }} justifyContent="center" alignItems="center">
          <JobCardComponent />
        </Stack>
      </Stack>
    </>
  );
}

export default Portal;
