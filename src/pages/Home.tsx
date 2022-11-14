import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import iconLogo from "../images/icon-light-filled.png";
import { Button, Grid, InputBase } from "@mui/material";
import { useState, useEffect } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const ResponsiveAppBar: React.FC = () => {
  const [isNoteDetailVisible, setIsNoteDetailVisible] =
    useState<boolean>(false);

  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteBody, setNoteBody] = useState<string>("");

  const showNoteDetails = (ev: string) => {
    setIsNoteDetailVisible(true);
    setNoteBody(ev);
  };

  const hideNoteDetails = () => {
    setIsNoteDetailVisible(false);
  };

  const settings = ["Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Avatar
              alt="Icon nkeeper"
              src={iconLogo}
              sx={{ display: "flex", mr: 1 }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid container>
        <Grid
          item
          sx={{
            mt: "1rem",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "40vw",
              "@media (max-width:400px)": { width: "90vw" },
              border: isNoteDetailVisible === false ? "none" : "1px solid #ccc",
              borderRadius: "5px",
              margin: 1,
            }}
          >
            <Box
              sx={{
                display: isNoteDetailVisible === false ? "none" : "flex",
                flexDirection: "column",
                width: "40vw",
                "@media (max-width:400px)": { width: "90vw" },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, paddingTop: 1 }}
                placeholder="Titulo"
                fullWidth
                onChange={(ev) => setNoteTitle(ev.target.value)}
              />
            </Box>
            <InputBase
              sx={{
                border:
                  isNoteDetailVisible === false ? "1px solid #ccc" : "none",
                padding: 1,
                borderRadius: "5px",
              }}
              id="criar-nota"
              fullWidth
              placeholder="Criar uma nota..."
              onChange={(ev) => showNoteDetails(ev.target.value)}
              onFocus={(ev) => showNoteDetails(ev.target.value)}
            />
            <Box
              sx={{
                display: isNoteDetailVisible === false ? "none" : "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: isNoteDetailVisible === false ? "none" : "flex",
                  flexDirection: "row",
                }}
              >
                <IconButton aria-label="colors">
                  <ColorLensIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: isNoteDetailVisible === false ? "none" : "flex",
                  flexDirection: "row",
                }}
              >
                <Button onClick={hideNoteDetails} variant="text">
                  FECHAR
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default ResponsiveAppBar;
