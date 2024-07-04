import React from "react";
import TextScroll from "./TextScroll";
import BankOfBihar from "../../assets/BankOfBihar.png";

function Navbar() {
  return (
    <div className="bg-[#0000FF] w-full flex flex-col sm:flex-row items-center">
      <div className="flex-shrink-0">
        <img src={BankOfBihar} alt="Bank Of Bihar" className="h-16 sm:h-20" />
      </div>
      <div className="flex-grow w-full">
        <TextScroll />
      </div>
    </div>
  );
}

export default Navbar;
