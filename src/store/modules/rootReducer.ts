import { combineReducers } from "@reduxjs/toolkit";
import createUser from "./SignupSlice";
import login from "./LoginSlice";
import logout from "./LoginSlice";
import loggedin from "./LoginSlice";

export default combineReducers({
  createUser,
  login,
  logout,
  loggedin,
});
