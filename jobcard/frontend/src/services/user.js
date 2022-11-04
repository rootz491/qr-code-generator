// save user to database
import http from "./http";

// get id from token and save user to database
import { isAuthenticated } from "./auth";
import { errorToast, successToast } from "../utils/toast";
import { getUserType } from "./auth";

export function handelSaveUser(user) {
  console.log("working");
  console.log(user);
  console.log(isAuthenticated());
  if (isAuthenticated()) {
    console.log(getUserType());
    if (getUserType() === "user") {
      // const {
      //   currCTC,
      //   currCompany,
      //   currInHandCTC,
      //   currLocation,
      //   currWFHLocation,
      //   email,
      //   expectedSalary,
      //   experience,
      //   fullname,
      //   jobtitle,
      //   joiningDate,
      //   lastWorkDay,
      //   message,
      //   noticePeriod,
      //   offeredCTC,
      //   passingYear,
      //   qualification,
      //   relocate,
      //   resume,
      //   totalexperience,
      //   workingremote,
      // } = user;
      http
        .post("/api/auth/save-user", user)
        .then((res) => {
          console.log(res);
          successToast("User Saved Successfully");
        })
        .catch((err) => {
          errorToast(err?.response?.data?.message);
          console.log(err);
        });
    } else {
      errorToast("You are not authorized to perform this action");
    }
  }
}

// get id of user from token and get the uesr from database

export function saveUserFeedback(feedback) {
  http
    .post("/api/auth/save-user-feedback", feedback)
    .then((res) => {
      console.log(res);
      successToast("Feedback Saved Successfully");
    })
    .catch((err) => {
      console.log(err);
      errorToast(err?.response?.data?.message);
    });
}
