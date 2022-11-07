import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { handelGetOtp, handelVerifyOtp } from "../../services/otpService";

function AuthForm() {
	const [data, setData] = React.useState({
		mobile: "",
		otp: "",
	});

	const [showMobile, setShowMobile] = React.useState(true);
	const [showOTP, setShowOTP] = React.useState(false);

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowMobile((prev) => !prev);
		setShowOTP((prev) => !prev);
		handelGetOtp(data.mobile);
		console.log(data);
	};

	return (
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
			<Avatar
				sx={{
					m: 1,
					bgcolor: "secondary.main",
					width: "80px",
					height: "80px",
				}}
			/>
			<Typography
				component="h1"
				variant="h4"
				align="center"
				color="textPrimary"
				fontWeight="bolder"
			>
				Signup/Login
			</Typography>
			<Typography fontWeight="thin" color="black">
				Enter your Mobile Number to signup or login
			</Typography>
			<Stack
				mt="50px"
				direction="column"
				spacing={1}
				maxWidth="500px"
				width="100%"
			>
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
							<TextField
								variant="outlined"
								size="medium"
								label="Mobile number"
								color="secondary"
								onChange={handleChange}
								sx={{
									color: "white",
									borderColor: "white",
									borderRadius: 2,
									borderTopLeftRadius: 0,
									borderBottomLeftRadius: 0,
								}}
								required
								fullWidth
								// disabled={sentVerification}
								name="mobile"
								type="tel"
								id="phone"
							/>
						</Stack>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}
						>
							Proceed to verify with OTP
						</Button>
					</Box>
				)}

				{showOTP && (
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							variant="outlined"
							size="medium"
							label="OTP"
							color="secondary"
							onChange={handleChange}
							sx={{
								color: "white",
								borderColor: "white",
								borderRadius: 2,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
							}}
							required
							fullWidth
							// disabled={sentVerification}
							name="otp"
							type="tel"
							id="otp"
						/>
						<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={() => handelVerifyOtp(data.mobile, data.otp)}
						>
							Verify OTP
						</Button>
					</Box>
				)}
			</Stack>
		</Box>
	);
}

export default AuthForm;
