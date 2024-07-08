import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import CommanLayout from "./layout/CommanLayout";
import HomePage from "./pages/HomePage";
import Login from "./components/Login/Login";
import Test from "./components/test/Test";
import UserAccount from "./components/user/UserAccount";
import { setAuth } from "./store/user.slice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="" element={<CommanLayout />}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/account" element={<UserAccount />}></Route>
      </Route>
    </Route>
  )
);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      console.log("FetchData from App");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/system/get-account`,
          { withCredentials: true }
        );
        if (response) {
          console.log("get-account ==> ");
          console.log(response.data);
          dispatch(setAuth(response.data));
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
