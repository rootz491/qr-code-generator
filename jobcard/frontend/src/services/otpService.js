// import { errorToast, successToast } from "../utils/toast";
// import http from "./httpService";
// export function handelGetOtp(mobilenum) {
// 	http
// 		.post("/api/auth/request-login-via-otp", { mobilenum })
// 		.then((res) => {
// 			console.log(res);
// 			successToast(res.data.message);
// 		})
// 		.catch((err) => {
// 			errorToast(err.response.data.message);
// 			console.log(err);
// 		});
// }

// export function handelVerifyOtp(mobilenum, otp) {
// 	http
// 		.post("/api/auth/verify-login-via-otp", { number: mobilenum, otp })
// 		.then((res) => {
// 			console.log(res);
// 			successToast(res.data.message);
// 		})
// 		.catch((err) => {
// 			errorToast(err.response.data.message);
// 			console.log(err);
// 		});
// }
