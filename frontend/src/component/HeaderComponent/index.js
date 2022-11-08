import React from "react";
import { useState } from "react";
import { AppBar, IconButton, Menu, Toolbar, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { MenuItem } from "@mui/material";
import YugamLogo from "../../icons/yugamLogo.png";
import { logout } from "../../services/user";

const settings = ["Profile", "Logout"];

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    settings.map((setting) => {
      if (setting === "Logout") {
        logout();
      } else {
        console.log("some erroe occured, can't logout");
      }
      return 0;
    });
  };

  return (
    <AppBar
      position="sticky"
      style={{
        marginBottom: "15px",
        // ".MuiAppBar-positionSticky": {
        backgroundColor: "#ffffff",
        // },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={YugamLogo} alt="Yugam Logo" style={{ height: "50px", width: "50px" }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".08rem",
                color: "#316CAD",
                textDecoration: "none",
              }}
            >
              Yugam Career Portal
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                  {/* if settigs is logout then run function logout() */}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
