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
import Note from "../components/note/Note";

const ResponsiveAppBar: React.FC = () => {
  const titulo = "Lorem Ipsum";
  const corpo =
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam eos, exercitationem illum molestias consequuntur neque maxime ipsum quas at officiis amet. Modi enim tempore aliquam magni molestias dolore qui tenetur. ";

  // standart true but changed to false
  const [noteDetailsHidden, setNoteDetailsHidden] = useState<boolean>(true);
  const [saveNoteHidden, setSaveNoteHidden] = useState<boolean>(true);

  const [noteColor, setNoteColor] = useState<string>("#fff");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteBody, setNoteBody] = useState<string>("");

  const showNoteDetails = (noteDetail: string) => {
    setNoteDetailsHidden(false);
    setNoteBody(noteDetail);
  };

  const hideDetails = () => {
    setNoteDetailsHidden(true);
  };

  const settings = ["Logout"];
  const colors = ["#fff", "#e91e63", "#4caf50", "#2196f3"];

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

  const handleItemMenuClick = () => {
    alert("asd");
    handleCloseUserMenu();
  };

  // colors menu
  const [anchorElColor, setAnchorElColor] = React.useState<null | HTMLElement>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElColor(event.currentTarget);
  };
  const handleCloseColor = () => {
    setAnchorElColor(null);
  };

  const handleChangeColor = (color: string) => {
    handleCloseColor();
    setNoteColor(color);
  };

  useEffect(() => {
    if (noteTitle.length > 0 || noteBody.length > 0) {
      setSaveNoteHidden(false);
    } else {
      setSaveNoteHidden(true);
    }
  }, [noteTitle, noteBody]);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                  <MenuItem key={setting} onClick={handleItemMenuClick}>
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
          xs={12}
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
              border: noteDetailsHidden === true ? "none" : "1px solid #ccc",
              backgroundColor: noteColor,
              borderRadius: "5px",
              margin: 1,
            }}
          >
            <Box
              sx={{
                display: noteDetailsHidden === true ? "none" : "flex",
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
                value={noteTitle}
              />
            </Box>
            <InputBase
              sx={{
                border: noteDetailsHidden === true ? "1px solid #ccc" : "none",
                padding: 1,
                borderRadius: "5px",
              }}
              id="criar-nota"
              fullWidth
              placeholder="Criar uma nota..."
              onChange={(ev) => showNoteDetails(ev.target.value)}
              onFocus={(ev) => showNoteDetails(ev.target.value)}
              value={noteBody}
            />
            <Box
              sx={{
                display: noteDetailsHidden === true ? "none" : "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: noteDetailsHidden === true ? "none" : "flex",
                  flexDirection: "row",
                }}
              >
                <IconButton
                  // aria-label="colors"
                  id="icon-button-colors"
                  aria-controls={
                    Boolean(anchorElColor) ? "basic-color-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorElColor) ? "true" : undefined}
                  onClick={handleClick}
                >
                  <ColorLensIcon />
                </IconButton>
                <Menu
                  id="basic-color-menu"
                  anchorEl={anchorElColor}
                  keepMounted
                  open={Boolean(anchorElColor)}
                  onClose={handleCloseColor}
                  MenuListProps={{
                    "aria-labelledby": "icon-button-colors",
                  }}
                >
                  {colors.map((colors) => (
                    <MenuItem
                      key={colors}
                      onClick={() => {
                        handleChangeColor(colors);
                      }}
                    >
                      <Box
                        sx={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: colors,
                          border: "1px solid #ccc",
                        }}
                      ></Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                sx={{
                  display: noteDetailsHidden === true ? "none" : "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: saveNoteHidden === true ? "none" : "flex",
                  }}
                >
                  <Button onClick={hideDetails} variant="text">
                    SALVAR
                  </Button>
                </Box>
                <Button onClick={hideDetails} variant="text">
                  FECHAR
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* conteudo */}
        <Grid
          item
          xs={12}
          sx={{
            paddingTop: "1rem",
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <Note
                  color={noteColor}
                  noteTitle={titulo}
                  noteBody={corpo}
                  colors={colors}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Note
                  color={noteColor}
                  noteTitle={titulo}
                  noteBody={corpo}
                  colors={colors}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Note
                  color={noteColor}
                  noteTitle={titulo}
                  noteBody={corpo}
                  colors={colors}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Note
                  color={noteColor}
                  noteTitle={titulo}
                  noteBody={corpo}
                  colors={colors}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
export default ResponsiveAppBar;
