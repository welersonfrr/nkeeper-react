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
import { useAppDispatch } from "../store/hooks";
import { createUser } from "../store/modules/SignupSlice";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispach = useAppDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRePassword] = useState<string>("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const clearFields = () => {
    setUser("");
    setPassword("");
    setRePassword("");
  };

  const handleSignup = () => {
    const newUser = localStorage.getItem(user);
    if (newUser != null) {
      setOpenSnack(true);
      clearFields();
    } else {
      dispach(createUser({ user, password }));
      navigate("/login");
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

  const signIn = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (user.length > 0 && password.length > 4 && password === repassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user, password, repassword]);

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
            <TextField
              margin="normal"
              type="password"
              id="repassword"
              label="Repeat Password"
              variant="outlined"
              value={repassword}
              onChange={(ev: any) => setRePassword(ev.target.value)}
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
                onClick={handleSignup}
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
              <Button onClick={signIn}>Fazer Login</Button>
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
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Já existe conta com este usuário!
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Signup;
