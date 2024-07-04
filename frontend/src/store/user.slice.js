import { createSlice } from "@reduxjs/toolkit";

/*----------------------Initial State----------------------*/
const initialState = {
  login: false,
  userData: null,
  role: null,
  userDataAvailable: false,
};

/*----------------------record slice----------------------*/
const userSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userData = action.payload;
      console.log(`action.payload.role; ==> ${action.payload.role}`);

      state.role = action.payload.role;
      state.login = true;
    },
    setLogout: (state) => {
      state.login = false;
    },
    setUserEnrolled: (state, action) => {
      state.userEnrolledIn = action.payload;
      console.log(`state.userEnrolledIn => ${state.userEnrolledIn}`);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.role = action.payload.role;

      (state.userDataAvailable = true), (state.login = true);
    },
    getUserData: (state) => {
      return state.userData;
    },

    setCourses: (state, action) => {
      // console.log("===> ", action.payload.courses);
      (state.courses = action.payload.courses), (state.coursesAvailable = true);
    },
    getCourses: (state) => {
      return state.courses;
    },
  },
});

export const {
  setAuth,
  setCourses,
  getCourses,
  setUserData,
  getUserData,
  setLogout,
  setUserEnrolled,
} = userSlice.actions;

export default userSlice.reducer;
