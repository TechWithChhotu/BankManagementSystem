import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import FloatingChatbotButton from "./BotIcon";

function CommanLayout() {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar />
      <Outlet />
      <FloatingChatbotButton />
      <Footer />
    </div>
  );
}

export default CommanLayout;
