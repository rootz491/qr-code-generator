import { errorToast, successToast } from "../utils/toast";
import http from "./http";
export function handelGetOtp(mobilenum) {
  http
    .post("/api/auth/request-login-via-otp", { mobilenum })
    .then((res) => {
      console.log(res);
      let flag = false;
      // if res.data.success is true, then show success toast
      successToast(res?.data?.message);
      flag = true;
      return flag;
    })
    .catch((err) => {
      errorToast(err?.response?.data?.message);
      console.log(err);
    });
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
      // settime out for 1 second
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    })
    .catch((err) => {
      errorToast(err.response.data.message);
      console.log(err);
    });
}
