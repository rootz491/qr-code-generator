import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";

function FormComponent({ setFormState }) {
  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Stack
      sx={{
        width: "580px",
        p: "20px",
        boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
        margin: "20px",
      }}
    >
      <Grid container spacing={5} sx={{ height: "auto", overflow: "hidden" }}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullname"
            name="fullname"
            label="Full Name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <Typography>Resume (pdf only)</Typography>
            <Button variant="outlined" component="label" endIcon={<UploadFile />}>
              Upload File
              <input hidden accept=".pdf" type="file" />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="mobilenum" name="mobilenum" label="Mobile Number" fullWidth variant="outlined" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="outlined"
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="qualification"
            name="qualification"
            label="Qualification (Ex: M.Tech)"
            fullWidth
            autoComplete="qualification"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="passingYear"
            name="passingYear"
            label="Passing year (Ex - 2019)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="experience"
            name="experience"
            label="Total Experience (Ex - 4.5 years)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="fresher" required>
              Are you a fresher
            </FormLabel>
            <RadioGroup row aria-labelledby="fresher" name="fresher">
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="currCompany"
            name="currCompany"
            label="Current Company Name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ gap: 2 }}>
            <FormLabel id="skillLevel" required>
              Rate your on JavaScript and Frontend Development
            </FormLabel>
            <Typography variant="body2" color="grey">
              (1 being learning and 10 being expert)
            </Typography>
            <RadioGroup row aria-labelledby="skillLevel" name="skillLevel">
              <FormControlLabel value="1" control={<Radio size="small" />} label="1" labelPlacement="top" />
              <FormControlLabel value="2" control={<Radio size="small" />} label="2" labelPlacement="top" />
              <FormControlLabel value="3" control={<Radio size="small" />} label="3" labelPlacement="top" />
              <FormControlLabel value="4" control={<Radio size="small" />} label="4" labelPlacement="top" />
              <FormControlLabel value="5" control={<Radio size="small" />} label="5" labelPlacement="top" />
              <FormControlLabel value="6" control={<Radio size="small" />} label="6" labelPlacement="top" />
              <FormControlLabel value="7" control={<Radio size="small" />} label="7" labelPlacement="top" />
              <FormControlLabel value="8" control={<Radio size="small" />} label="8" labelPlacement="top" />
              <FormControlLabel value="9" control={<Radio size="small" />} label="9" labelPlacement="top" />
              <FormControlLabel value="10" control={<Radio size="small" />} label="10" labelPlacement="top" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="workingRemote" required>
              Are you working Remotely
            </FormLabel>
            <RadioGroup row aria-labelledby="workingRemote" name="workingRemote">
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="not-applicable" control={<Radio />} label="Not Applicable" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="currCTC"
            name="currCTC"
            label="Current CTC (Ex - 2.4 LPA)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="currInHandCTC"
            name="currInHandCTC"
            label="Current in hand salary (per month, Ex 20K, 34K)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="expectedSalary"
            name="expectedSalary"
            label="Expected in hand salary (per month, Ex 20K, 34K)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="noticePeriod"
            name="noticePeriod"
            label="Notice period (Months) (Ex - 2)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="isNoticePeriod" required>
              Are you in notice period
            </FormLabel>
            <RadioGroup aria-labelledby="isNoticePeriod" name="isNoticePeriod">
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel
                value="not-applicable"
                control={<Radio />}
                label="Not Applicable, looking for first job"
              />
              <FormControlLabel value="served" control={<Radio />} label="Already served the Notice period" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="body1" color="grey">
              Last working day (If serving notice period)
            </Typography>
            <TextField type="date" id="lastWorkDay" name="lastWorkDay" fullWidth variant="outlined" onChange={handleChange} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="isJoining" required>
              Are you able to join immediately
            </FormLabel>
            <RadioGroup row aria-labelledby="isJoining" name="isJoining">
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="currOfficLocation"
            name="currOfficLocation"
            label="Current office location"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="currWFHLocation"
            name="currWFHLocation"
            label="Current work from home location"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="relocate" required>
              Relocate to Dehradun for job?
            </FormLabel>
            <RadioGroup row aria-labelledby="relocate" name="relocate">
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="highSchool"
            name="highSchool"
            label="Which City you did your Schooling (10th and 12th)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="graduation"
            name="graduation"
            label="Which City you did Graduation (Ex - BE, MBA etc)"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ height: "auto" }}
            required
            id="message"
            name="message"
            label="Any message for us?"
            fullWidth
            multiline
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default FormComponent;
