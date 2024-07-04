import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

function CommanLayout() {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default CommanLayout;
