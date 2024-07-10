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
      state.role = action.payload.role;
      state.login = true;
      state.userData = action.payload;
    },
    setLogout: (state) => {
      state.login = false;
      state.userData = null;
      state.role = null;
      state.userDataAvailable = false;
    },
    updateBalance: (state, action) => {
      if (
        state.userData &&
        state.userData.data &&
        state.userData.data.account
      ) {
        state.userData.data.account.balance = action.payload;
      }
    },
  },
});

export const { setAuth, setLogout, updateBalance } = userSlice.actions;

export default userSlice.reducer;
