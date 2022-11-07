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
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { handelSaveUser } from "../../services/user";

function FormComponent({ setFormState, formState }) {
  const handleChange = (e) => {
    //removing commas from the data
    let value;
    switch (e.target.name) {
      case "currCTC":
        value = e.target.value.replace(/,/g, "");
        break;
      case "offeredCTC":
        value = e.target.value.replace(/,/g, "");
        break;
      case "currInHandCTC":
        value = e.target.value.replace(/,/g, "");
        break;
      case "expectedSalary":
        value = e.target.value.replace(/,/g, "");
        break;
      default:
        value = e.target.value;
        break;
    }
    setFormState((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const saveFormData = () => {
    console.log(formState);

    const id = Math.floor(Math.random() * 100000000);
    const clientInfos = JSON.parse(localStorage.getItem("clientInfos")) || [];
    console.log(id);
    clientInfos.push({
      id,
      ...formState,
    });

    localStorage.setItem("clientInfos", JSON.stringify(clientInfos));
  };

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    //  base64 encode the file
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormState((prev) => ({
        ...prev,
        resume: {
          name: e.target.files[0].name,
          data: reader.result,
        },
      }));
    };
  };

  const numberFormat = (value) => {
    if (isNaN(value) || value === "") {
      return "";
    } else return parseInt(value).toLocaleString("en-IN");
  };

  return (
    <>
      <Stack
        sx={{
          width: "85%",
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
             <Grid item xs={12}>
            <TextField
              required
              id="altmobilenum"
              name="altmobilenum"
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
          </Grid>
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
                <MenuItem value="Experienced and already served notice period">
                  Experienced and already served notice period
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
          {formState.experience === "Fresher" ? (
            <Grid item xs={12}>
              <TextField
                required
                id="prevJobTitle"
                name="prevJobTitle"
                label="Current Company Job Title"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          ) : (
            <></>
          )}
         
          <Grid item xs={4}>
            <Stack spacing={2}>
              <Typography>Resume (pdf only)</Typography>
              <Button
                variant={formState?.resume != null ? "solid" : "outlined"}
                component="label"
                sx={{ width: "200px" }}
                endIcon={<UploadFile />}
                name="resume"
              >
                <Typography
                  sx={{
                    width: "70%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {formState?.resume?.name ?? "Upload File"}
                </Typography>
                <input hidden accept=".pdf" type="file" onChange={handleFile} />
              </Button>
            </Stack>
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
            <TextField
              id="institute"
              name="institute"
              label="Institute Name"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="workingremote" required>
                Are you working Remotely
              </FormLabel>
              <RadioGroup row aria-labelledby="workingremote" name="workingremote" onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="not-applicable" control={<Radio />} label="Not Applicable" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formState.experience === "Experienced" ? (
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
          ) : (
            <></>
          )}
          {formState.experience === "Fresher" ? (
            <></>
          ) : (
            <>
              <Grid item xs={12}>
                <TextField
                  required
                  id="currCTC"
                  name="currCTC"
                  label="Current CTC"
                  fullWidth
                  variant="outlined"
                  value={numberFormat(formState.currCTC)}
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
                  value={numberFormat(formState.currInHandCTC)}
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
                  value={numberFormat(formState.offeredCTC)}
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
              value={numberFormat(formState.expectedSalary)}
              onChange={handleChange}
            />
          </Grid>
          {formState.experience !== "Fresher" && formState.experience !== "Experienced" ? (
            <>
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
                <Stack spacing={1}>
                  <Typography variant="body1" color="grey">
                    Joining Date
                  </Typography>
                  <TextField
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Stack>
              </Grid>
            </>
          ) : (
            <></>
          )}

          <Grid item xs={12}>
            <TextField
              required
              id="currLocation"
              name="currLocation"
              label="Current location"
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
              <RadioGroup row aria-labelledby="relocate" name="relocate" onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" color="grey">
              {" "}
              {formState.experience === "Fresher"
                ? "Why you are a good fit?"
                : "Short Introduction or Any Message"}{" "}
            </Typography>
            <TextareaAutosize
              id="message"
              name="message"
              placeholder="Enter your message here"
              minRows={8}
              cols={83}
              style={{ padding: "5px", marginTop: "10px", width: "97%" }}
              sx={{
                background: "white",
                border: "1px solid gray",
                borderRadius: "2px",
              }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Stack>
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3, mb: 2, width: "200px" }}
        onClick={() => handelSaveUser(formState)}
      >
        Save
      </Button>
    </>
  );
}

export default FormComponent;
