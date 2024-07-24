import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BankOfBihar from "../../assets/BankOfBihar.png";
import issueCardImage from "../../assets/atm-machine.png"; // Add appropriate image assets
import blockCardImage from "../../assets/atm-machine.png";
import activateCardImage from "../../assets/atm-machine.png";
import IssueAtmCard from "../atmcard/IssueATMCar";
import BlockATMCard from "../atmcard/BlockATMCard";
import ActivatePin from "../atmcard/ActivatePin";
import LoanIcon from "../../assets/loan.png";

const LoanServices = () => {
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
            src={LoanIcon}
            className="w-[200px] h-[200px]"
            alt="Issue ATM Card"
          />
          <span className="text-[10px]">Loan Services</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="p-8 rounded-lg shadow-lg  w-[650px]   backdrop-blur-md border ">
            {/* test --> issue ATM Card */}
            <div className="grid gap-10 grid-cols-3 ">
              <IssueAtmCard />
              <BlockATMCard />
              <ActivatePin />
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

export default LoanServices;
