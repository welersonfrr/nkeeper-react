import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoundButtonStyled from "../components/RoundButton/RoundButtonStyled";
import iconLogo from "../images/logo-nobg.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    // navigate("/");
    document.location.reload();
  };

  const signUp = () => {
    navigate("/signup");
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

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
              // alignItems: "center",
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
              type={"email"}
              id="email"
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={(ev: any) => setEmail(ev.target.value)}
              fullWidth
            />
            <TextField
              margin="normal"
              type={"password"}
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(ev: any) => setPassword(ev.target.value)}
              fullWidth
            />
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Manter logado" />
            </FormGroup>
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
                onClick={navigateToHome}
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
    </>
  );
};

export default Login;
