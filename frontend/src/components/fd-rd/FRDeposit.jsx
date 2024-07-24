import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BankOfBihar from "../../assets/BankOfBihar.png";

import Investment from "../../assets/Investment.png";
import DepositCalculator from "./InvestmentCalculator";
import InvestInFDOrRD from "./InvestInFDOrRD";

const FRDeposit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (action) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => openModal("issue")}
          className="rounded-lg shadow-lg shadow-gray-500 border-t p-2"
        >
          <img
            src={Investment}
            className="w-[200px] h-[200px]"
            alt="Investment"
          />
          <span className="text-[10px]">FD/RD Services</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="p-8 rounded-lg shadow-lg  w-[430px]   backdrop-blur-md border ">
            {/* test --> issue ATM Card */}
            <div className="grid gap-10 grid-cols-2 ">
              <InvestInFDOrRD />
              <DepositCalculator />
            </div>
            <button
              className="mt-8 w-full  bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FRDeposit;
