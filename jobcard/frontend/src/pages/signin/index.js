import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";

function AuthForm() {
  return (
    <Box
      sx={{
        marginTop: 8,
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
      <Typography component="h1" variant="h4" align="center" color="textPrimary" fontWeight="bolder">
        Signup/Login by Phone number
      </Typography>
      <Typography fontWeight="thin" color="black">
        Enter your phone number to signup or login
      </Typography>
      <Stack mt="50px" direction="column" spacing={1} maxWidth="500px" width="100%">
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
              label="Phone number"
              color="secondary"
              // value={phone}
              // onChange={(e: any) =>
              //   setPhone(e.target.value)
              // }
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
              name="phone"
              type="tel"
              id="phone"
            />
          </Stack>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Proceed
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default AuthForm;
