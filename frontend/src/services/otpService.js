import { errorToast, successToast } from "../utils/toast";
import http from "./http";

export async function handelGetOtp(mobilenum, callback) {
  const res = await http.post("/api/auth/request-login-via-otp", { mobilenum }).catch((err) => {
    errorToast(err?.response?.data?.message);
    console.log(err);
    return false;
  });
  if (res) {
    successToast(res?.data?.message);
    callback();
    return true;
  }
}

export function handelVerifyOtp(mobilenum, otp) {
  http
    .post("/api/auth/verify-login-via-otp", { number: mobilenum, otp })
    .then((res) => {
      console.log(res);
      successToast(res?.data?.message);
      //saving the token will
      localStorage.setItem("access_token", res.data.access_token);
      // navigate to the route /
      window.location = "/";
    })
    .catch((err) => {
      errorToast(err.response.data.message);
      console.log(err);
    });
}