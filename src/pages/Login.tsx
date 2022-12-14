import {
  Avatar,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoundButtonStyled from "../components/RoundButton/RoundButtonStyled";
import iconLogo from "../images/logo-nobg.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/modules/LoginSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispach = useAppDispatch();
  const loginLocal = JSON.parse(localStorage.getItem("logged")!);
  const userInfo = useAppSelector((state) => state.login);

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [openSnack, setOpenSnack] = React.useState(false);

  useEffect(() => {
    // CHECAR SE EXISTE USUARIO LOGADO
    if (loginLocal != null) {
      navigate("/");
    }
  });

  const handleLogin = () => {
    const checkUser = localStorage.getItem(user);
    if (checkUser === null) {
      setOpenSnack(true);
    } else {
      dispach(login({ user, password }));
      if (userInfo.user === "") {
        setOpenSnack(true);
      } else {
        navigate("/");
      }
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const signUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (user.length > 0 && password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user, password]);

  return (
    <>
      <Grid container component={"main"} sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 8,
              my: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="nkeeper logo"
                src={iconLogo}
                sx={{ width: 300, height: 300 }}
              />
            </Box>
            <TextField
              autoFocus
              margin="normal"
              type="text"
              id="user"
              label="User"
              variant="outlined"
              value={user}
              onChange={(ev: any) => setUser(ev.target.value)}
              fullWidth
            />
            <TextField
              margin="normal"
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(ev: any) => setPassword(ev.target.value)}
              fullWidth
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <RoundButtonStyled
                color={isButtonDisabled === true ? "#ccc" : "#fff"}
                bgcolor={
                  isButtonDisabled === true ? "transparent" : "#5e17ebff"
                }
                onClick={handleLogin}
                disabled={isButtonDisabled}
              >
                <ArrowForwardIcon />
              </RoundButtonStyled>
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: "40px",
                left: "50px",
              }}
            >
              <Button onClick={signUp}>Criar conta</Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>
      <Grid>
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Verifique seu usuário e senha!
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Login;
