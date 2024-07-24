// src/components/InvestmentCalculator.jsx
import React, { useState } from "react";
import FDCalculator from "./FDCalculator";
import RDCalculator from "./RDCalculator";
import Modal from "../Model";
import Calculator from "../../assets/Calculator.png";

const InvestmentCalculator = () => {
  const [calculatorType, setCalculatorType] = useState("FD");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <div className="">
      <button onClick={openModal} className=" py-2 px-4 rounded">
        <img src={Calculator} alt="Open Investment Calculator" />
        <span className="text-[10px]">FD/RD Calculator</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md   relative">
            <button
              className="absolute top-3 right-3 text-2xl font-bold  text-red-500 "
              title="close"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
            <div className="flex justify-center mb-4">
              <label className="mr-4">
                <input
                  type="radio"
                  name="calculatorType"
                  value="FD"
                  checked={calculatorType === "FD"}
                  onChange={() => setCalculatorType("FD")}
                  className="mr-2"
                />
                Fixed Deposit (FD)
              </label>
              <label>
                <input
                  type="radio"
                  name="calculatorType"
                  value="RD"
                  checked={calculatorType === "RD"}
                  onChange={() => setCalculatorType("RD")}
                  className="mr-2"
                />
                Recurring Deposit (RD)
              </label>
            </div>
            {calculatorType === "FD" ? <FDCalculator /> : <RDCalculator />}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
