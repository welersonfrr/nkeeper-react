import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginType } from "../../Types";
import CryptoJS from "crypto-js";

const initialState: LoginType = {
  user: "",
  password: "",
  encKey: "",
  keepLogged: false,
} as LoginType;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginType>) {
      const user = action.payload.user;
      const password = action.payload.password;
      const userData = JSON.parse(localStorage.getItem(user)!);
      const encryptedPassword = userData["password"];
      const salt = userData["salt"];
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        salt
      ).toString(CryptoJS.enc.Utf8);

      if (password === decryptedPassword) {
        state.user = user;
        state.encKey = salt;
        localStorage.setItem("logged", JSON.stringify(state));
        return state;
      } else {
        return state;
      }
    },
    logout() {
      return initialState;
    },
    loggedin(state, action: PayloadAction<LoginType>) {
      state.user = action.payload.user;
      state.encKey = action.payload.encKey;
      return state;
    },
  },
});

export const { login, logout, loggedin } = loginSlice.actions;
export default loginSlice.reducer;
