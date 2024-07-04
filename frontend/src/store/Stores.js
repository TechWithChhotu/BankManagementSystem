// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./user.slice";
// import courseSlice from "./courseSlice";

// const store = configureStore({
//   reducer: { userSlice, accountSlice },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";

const store = configureStore({
  reducer: { userSlice },
});

export default store;
