import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginType, UserType } from "../../Types";
import CryptoJS from "crypto-js";

const initialState: UserType = {
  user: "",
  password: "",
  salt: "",
  notes: [
    {
      noteTitle: "Standart note",
      noteBody: "Esta é uma nota de exemplo ",
      color: "#fff",
    },
  ],
} as UserType;

const SignupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<LoginType>) {
      const salt = CryptoJS.SHA256(Date.now().toString()).toString();
      const hashedPassword = CryptoJS.AES.encrypt(
        action.payload.password!,
        salt
      ).toString();

      state.user = action.payload.user;
      state.password = hashedPassword;
      state.salt = salt;

      localStorage.setItem(state.user, JSON.stringify(state));
    },
  },
});

export const { createUser } = SignupSlice.actions;
export default SignupSlice.reducer;
