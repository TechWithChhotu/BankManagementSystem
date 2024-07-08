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
      console.log(`action.payload.role; ==> `);
      console.log(action.payload);

      state.role = action.payload.role;
      state.login = true;
      state.userData = action.payload;
    },
    setLogout: (state) => {
      state.login = false;
    },
  },
});

export const { setAuth, setLogout } = userSlice.actions;

export default userSlice.reducer;
