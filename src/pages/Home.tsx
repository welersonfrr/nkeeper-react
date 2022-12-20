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
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Note from "../components/note/Note";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/modules/LoginSlice";
import NoteType from "../Types/NoteType";

const ResponsiveAppBar: React.FC = () => {
  const navigate = useNavigate();
  const dispach = useAppDispatch();
  const loginLocal = JSON.parse(localStorage.getItem("logged")!) || {
    user: null,
  };
  const user = loginLocal.user;
  const colors = ["#fff", "#e91e63", "#4caf50", "#2196f3"];

  const [noteDetailsHidden, setNoteDetailsHidden] = useState<boolean>(true);
  const [saveNoteHidden, setSaveNoteHidden] = useState<boolean>(true);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<number>(0);
  const [noteColor, setNoteColor] = useState<string>("#fff");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteBody, setNoteBody] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [dataUser, setDataUser] = useState<any>(
    JSON.parse(localStorage.getItem(user)!)
  ) || { notes: [] };
  const [openSnackSalvar, setOpenSnackSalvar] = React.useState(false);
  const [openSnackEditar, setOpenSnackEditar] = React.useState(false);
  const [openSnackEditarErro, setOpenSnackEditarErro] = React.useState(false);
  const [openSnackExcluir, setOpenSnackExcluir] = React.useState(false);

  useEffect(() => {
    // CHECAR SE EXISTE USUARIO LOGADO
    if (user === null) {
      navigate("/login");
    }
  }, []);

  // CONTROLE DO LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("logged");
    dispach(logout);
    navigate("/login");
  };

  // FUNCAO AUXILIAR PARA RESETAR OS VALORES DOS INPUTS
  const resetFields = () => {
    hideDetails();
    setNoteBody("");
    setNoteTitle("");
    setNewBody("");
    setNewTitle("");
    setNoteColor("#fff");
  };

  // FUNCOES PARA MOSTRAR OS BOTOES DE AÇAO DA NOTA
  const showNoteDetails = (noteDetail: string) => {
    setNoteDetailsHidden(false);
    setNoteBody(noteDetail);
  };
  const hideDetails = () => {
    setNoteDetailsHidden(true);
  };

  // CONTROLE DA APP BAR
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // CONTROLAR As CAIXAs DE DIALOGO
  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
  };

  // CONTROLAR OS SNACK'S
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackSalvar(false);
    setOpenSnackEditar(false);
    setOpenSnackEditarErro(false);
    setOpenSnackExcluir(false);
  };

  // DELETAR NOTA
  const handleDelete = () => {
    dataUser.notes.splice(selectedNote, 1);
    localStorage.setItem(user, JSON.stringify(dataUser));
    setDataUser(dataUser);
    setOpenSnackExcluir(true);
  };

  // EDITAR NOTA
  const handleEdit = () => {
    resetFields();

    if (newTitle.length > 0 || newBody.length > 0) {
      dataUser.notes[selectedNote].noteTitle = newTitle;
      dataUser.notes[selectedNote].noteBody = newBody;
      localStorage.setItem(user, JSON.stringify(dataUser));
      setDataUser(JSON.parse(localStorage.getItem(user)!));
      setOpenSnackEditar(true);
    } else {
      setOpenSnackEditarErro(true);
    }
  };

  // SALVAR NOTA
  const saveNote = (noteTitle: string, noteBody: string, color: string) => {
    resetFields();
    dataUser.notes.push({
      noteTitle: noteTitle,
      noteBody: noteBody,
      color: color,
    });
    localStorage.setItem(user, JSON.stringify(dataUser));
    setDataUser(JSON.parse(localStorage.getItem(user)!));
    handleCloseUserMenu();
    setOpenSnackSalvar(true);
  };

  // MENU DE COLORS
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

  // USE EFFECT PARA MOSTRAR O BOTAO DE SALVAR DA NOTA
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

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={`https://avatars.dicebear.com/api/identicon/${user}.svg`}
                    alt={user}
                    sx={{ bgcolor: "#fff", padding: "8px" }}
                  />
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
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
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
                  <Button
                    onClick={() => {
                      saveNote(noteTitle, noteBody, noteColor);
                    }}
                    variant="text"
                  >
                    SALVAR
                  </Button>
                </Box>
                <Button onClick={resetFields} variant="text">
                  FECHAR
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            paddingTop: "1rem",
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              {dataUser != null
                ? dataUser.notes.map((notes: NoteType, index: number) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Note
                        color={notes.color}
                        noteTitle={notes.noteTitle}
                        noteBody={notes.noteBody}
                        colors={colors}
                        index={index}
                        editFunc={() => {
                          setOpenEditDialog(true);
                          setNewTitle(dataUser.notes[selectedNote].noteTitle);
                          setNewBody(dataUser.notes[selectedNote].noteBody);
                        }}
                        deleteFunc={() => {
                          setOpenDeleteDialog(true);
                        }}
                        selectFunc={() => {
                          setSelectedNote(index);
                        }}
                      />
                    </Grid>
                  ))
                : ""}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid>
        <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
          <DialogTitle id="alert-dialog-title">
            {"Deseja excluir a nota?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              onClick={() => {
                handleCloseDialog();
                handleDelete();
              }}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid>
        <Dialog open={openEditDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Titulo"
              value={newTitle}
              onChange={(ev) => setNewTitle(ev.target.value)}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="Descricao"
              value={newBody}
              onChange={(ev) => setNewBody(ev.target.value)}
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              onClick={() => {
                handleCloseDialog();
                handleEdit();
              }}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid>
        <Snackbar
          open={openSnackSalvar}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Nota adicionada com sucesso!
          </Alert>
        </Snackbar>
      </Grid>
      <Grid>
        <Snackbar
          open={openSnackEditar}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Nota atualizada!
          </Alert>
        </Snackbar>
      </Grid>
      <Grid>
        <Snackbar
          open={openSnackExcluir}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Nota excluida!
          </Alert>
        </Snackbar>
      </Grid>
      <Grid>
        <Snackbar
          open={openSnackEditarErro}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Preencha ao menos um dos campos!
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};
export default ResponsiveAppBar;
