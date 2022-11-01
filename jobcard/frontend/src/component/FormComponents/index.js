import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";

function FormComponent({ setFormState, formState }) {
  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveFormData = () => {
    // save to local storage
    console.log(formState);
    localStorage.setItem("formState", JSON.stringify(formState));
  };

  return (
    <>
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
            <FormControl fullWidth>
              <InputLabel id="experience">Experience</InputLabel>
              <Select
                defaultValue="Fresher"
                labelId="experience"
                id="experience"
                label="experience"
                onChange={handleChange}
                name="experience"
              >
                <MenuItem value="Fresher">Fresher</MenuItem>
                <MenuItem value="Experienced">Experienced</MenuItem>
                <MenuItem value="Experienced and currently serving notice period">
                  Experienced and currently serving notice period
                </MenuItem>
                <MenuItem value="Experienced and already serving notice period">
                  Experienced and already serving notice period
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {formState.experience === "Fresher" ? (
            <></>
          ) : (
            <Grid item xs={12}>
              <TextField
                required
                id="totalexperience"
                name="totalexperience"
                label="Total Experience (Ex - 4.5 years)"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                type="number"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="jobtitle">Job Title</InputLabel>
              <Select labelId="jobtitle" id="jobtitle" label="jobtitle" onChange={handleChange} name="jobtitle">
                <MenuItem value={"Frontend developer"}>Frontend developer</MenuItem>
                <MenuItem value={"Fullstack developer"}>Fullstack developer</MenuItem>
                <MenuItem value={"UI/UX designer"}>UI/UX designer</MenuItem>
              </Select>
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
            <TextField
              required
              id="mobilenum"
              name="mobilenum"
              label="Mobile Number"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
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
              type="number"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="workingRemote" required>
                Are you working Remotely
              </FormLabel>
              <RadioGroup row aria-labelledby="workingRemote" name="workingRemote" onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="not-applicable" control={<Radio />} label="Not Applicable" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {formState.experience === "Fresher" ? (
            <></>
          ) : (
            <>
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
                <TextField
                  required
                  id="currCTC"
                  name="currCTC"
                  label="Current CTC"
                  fullWidth
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="currInHandCTC"
                  name="currInHandCTC"
                  label="Current in hand salary"
                  fullWidth
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="offeredCTC"
                  name="offeredCTC"
                  label="Any offered CTC "
                  fullWidth
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              required
              id="expectedSalary"
              name="expectedSalary"
              label="Expected CTC"
              fullWidth
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="body1" color="grey">
                Last working day (If serving notice period)
              </Typography>
              <TextField
                type="date"
                id="lastWorkDay"
                name="lastWorkDay"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="isJoining" required>
                Are you able to join immediately
              </FormLabel>
              <RadioGroup row aria-labelledby="isJoining" name="isJoining" onChange={handleChange}>
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
              label="Current location"
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
      <Button variant="contained" type="submit" sx={{ mt: 3, mb: 2 }} onClick={saveFormData}>
        Save
      </Button>
    </>
  );
}

export default FormComponent;
