import React from "react";
import Marquee from "react-fast-marquee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TextScroll() {
  return (
    <>
      <ToastContainer />
      <div className="bg-transparent text-white text-xl py-1">
        <Marquee className="text-3xl sm:text-2xl  ">
          <p className="px-60">Welcome to Bank of Bihar.</p>
          <p>बिहार बैंक में आपका स्वागत है|</p>
        </Marquee>
      </div>
    </>
  );
}

export default TextScroll;
