import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BankOfBihar from "../../assets/BankOfBihar.png";

import chequesIcon from "../../assets/cheque.png";

const Cheques = () => {
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
            src={chequesIcon}
            className="w-[200px] h-[200px]"
            alt="chequesIcon"
          />
          <span className="text-[10px]">Cheques</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="p-8 rounded-lg shadow-lg  w-[220px]   backdrop-blur-md border ">
            <button
              className="absolute top-3 right-3 text-2xl font-bold  text-red-600"
              onClick={closeModal}
            >
              X
            </button>
            {/* test --> issue ATM Card */}
            <div className="grid gap-10  ">
              <img src={chequesIcon} alt="" />
            </div>
            {/* <button
              className="mt-8 w-full  bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cheques;
