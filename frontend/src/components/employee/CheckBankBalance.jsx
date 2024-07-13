import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import BankOfBihar from "../../assets/BankOfBihar.png";
import getMaskedAccountNumber from "../../helper/getMaskedAc";

function CheckBalance() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAccountNumber("");
    setBalanceData(null);
    setErrorMessage(null);
  };

  const handleInputChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const checkBalance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/branch/check-bank-balance",
        { accountNumber },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        setBalanceData(response.data.data.balance);
        setAccountNumber(response.data.data.accountNumber);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.data.msg);
      }
    } catch (error) {
      setErrorMessage("Error fetching balance. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-lg shadow-lg shadow-gray-500 border-t p-2"
      >
        <AiOutlineEyeInvisible className="w-[200px] h-[200px]" />
        <span className="text-[10px]">Check Balance</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-lg ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <img src={BankOfBihar} alt="Bank Of Bihar" />
              <h2 className="text-2xl font-bold mb-4">Check Balance</h2>
            </div>
            <form onSubmit={checkBalance}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Check Balance
                </button>
              </div>
              {balanceData && (
                <div className="mt-4 text-center">
                  <p>A/C Number: {getMaskedAccountNumber(accountNumber)}</p>
                  <p>
                    Available Balance: <span>{balanceData}</span>
                  </p>
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 text-red-500 text-center">
                  {errorMessage}
                </div>
              )}
            </form>
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckBalance;
