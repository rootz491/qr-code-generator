import {
  Avatar,
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AuthCode from "react-auth-code-input";
import React, { useCallback } from "react";
import { handelGetOtp, handelVerifyOtp } from "../../services/otpService";
import "./index.css";

function AuthForm() {
  const [data, setData] = React.useState({
    mobile: "",
    otp: "",
    conuntryCode: "+91",
  });

  const [showMobile, setShowMobile] = React.useState(true);
  const [showOTP, setShowOTP] = React.useState(false);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnChange = (res) => {
    setData({
      ...data,
      otp: res,
    });
    console.log(data.otp);
  };

  React.useEffect(() => {
    // handleOnChange(data);
    if (data.otp.length === 6) {
      handelVerifyOtp(data.mobile, data.otp);
    }
  }, [data]);

  const handleSubmit = () => {
    setShowMobile((prev) => !prev);
    setShowOTP((prev) => !prev);
    handelGetOtp(data.mobile);
  };

  return (
    <>
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "600px",
          margin: "auto",
          width: "60%",
          height: "100vh",
        }}
      >
        <Typography component="h1" variant="h4" align="center" color="textPrimary" fontWeight="bolder">
          Signup/Login
        </Typography>
        <Stack mt="50px" direction="column" spacing={1} maxWidth="400px" width="100%">
          {showMobile && (
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack direction="row" alignItems="stretch" width="100%">
                  <FormControl sx={{ minWidth: 120, width: "20%" }} disabled>
                    <Select
                      sx={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                      labelId="demo-simple-select-disabled-label"
                      id="demo-simple-select-disabled"
                      value={data.conuntryCode}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"+91"}>+91</MenuItem>
                      <MenuItem value={"+1"}>+1</MenuItem>
                      <MenuItem value={"+81"}>+81</MenuItem>
                    </Select>
                  </FormControl>
                  <input
                    maxLength={10}
                    style={{
                      borderRadius: 4,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: "none",
                      border: "1px solid #bdbdbd",
                      flex: 1,
                      fontSize: "1rem",
                    }}
                    label="Mobile number"
                    onChange={handleChange}
                    required
                    // disabled={sentVerification}
                    name="mobile"
                    type="tel"
                    id="phone"
                  />
                </Stack>
              </Stack>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                Login
              </Button>
            </Box>
          )}

          {showOTP && (
            <>
              <Stack component="form" width="500px" alignItems="center">
                <AuthCode
                  onChange={handleOnChange}
                  allowedCharacters="numeric"
                  name="otp"
                  containerClassName="container"
                  inputClassName="input"
                  value={data.otp}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handelVerifyOtp(data.mobile, data.otp)}
                >
                  Verify OTP
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default AuthForm;
