import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import CommanLayout from "./layout/CommanLayout";
import HomePage from "./pages/HomePage";
import Login from "./components/Login/Login";
import Test from "./components/test/Test";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="" element={<CommanLayout />}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Route>
    </Route>
  )
);
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
