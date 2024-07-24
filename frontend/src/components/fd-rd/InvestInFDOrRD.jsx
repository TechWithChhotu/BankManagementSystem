import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { toast } from "react-toastify";
import Investment from "../../assets/Investment.png";
import Xbtn from "../buttons/Xbtn";
import Closebtn from "../buttons/Closebtn";
import ViewSummery from "./ViewSummery";
import { Link } from "react-router-dom";
import { duration } from "moment-timezone";

function InvestInFDOrRD() {
  const isYouEmployeeState = useSelector(
    (state) => state.userSlice.isYouEmployee
  );

  const [isYouEmployee, setIsYouEmployee] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [investmentType, setInvestmentType] = useState("FD");
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    duration: null,
  });

  useEffect(() => {
    setFormData({ accountNumber: "", amount: "", duration: "", pin: "" });
    setIsViewSummery(false);
  }, [investmentType]); //It will re-execute whenever the investment type changes

  const [isViewSummery, setIsViewSummery] = useState(false);

  useEffect(() => {
    if (formData.amount && formData.duration && !isYouEmployee)
      setIsViewSummery(true);
    else if (formData.amount && formData.duration && formData.accountNumber) {
      setIsViewSummery(true);
    }
  }, [formData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInvest = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure to invest")) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/system/invest-${investmentType.toLowerCase()}`,
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success(response.data.msg);
          setIsOpen(false);
          setFormData({ accountNumber: "", amount: "", duration: "", pin: "" });
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.msg);
      }
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setFormData({
      accountNumber: "",
      amount: "",
      duration: "",
    });
    setIsOpen(false);
  };
  const [isAutoDebitEnabled, setIsAutoDebitEnabled] = useState(false);

  const toggleAutoDebit = () => {
    setIsAutoDebitEnabled(!isAutoDebitEnabled);
  };

  return (
    <div>
      <button onClick={openModal}>
        <img src={Investment} alt="" />
        <span className="text-[10px]">Invest in FD/RD</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <img src={BankOfBihar} alt="Bank Logo" className="w-40" />
              <h2 className="text-xl font-bold mb-4">
                Invest in {investmentType}
              </h2>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="investmentType"
                    value="FD"
                    checked={investmentType === "FD"}
                    onChange={() => setInvestmentType("FD")}
                    className="mr-2"
                  />
                  Fixed Deposit (FD)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="investmentType"
                    value="RD"
                    checked={investmentType === "RD"}
                    onChange={() => setInvestmentType("RD")}
                    className="mr-2"
                  />
                  Recurring Deposit (RD)
                </label>
              </div>
            </div>
            {investmentType === "FD" ? (
              <form onSubmit={handleInvest}>
                {isYouEmployee && (
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Duration (in Years)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </form>
            ) : (
              <form className="grid gap-3">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Monthly Deposit amount
                  </label>
                  <input
                    type="text"
                    placeholder="Monthly Deposit amount"
                    required
                    name="amount"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                  <span className="text-[12px] text-red-500">
                    Min monthly deposit amount ₹100.00
                  </span>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Duration (in Years)
                  </label>
                  <input
                    type="text"
                    placeholder="duration"
                    required
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                {/* Auto Debit Switch btn */}
                <div className="grid">
                  <label className="mr-2 text-gray-700">Auto Debit</label>
                  <div>
                    <div
                      onClick={toggleAutoDebit}
                      className={`relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in h-6 bg-yellow-400 rounded-2xl `}
                    >
                      <input
                        type="checkbox"
                        checked={isAutoDebitEnabled}
                        onChange={toggleAutoDebit}
                        className={`absolute block w-6 h-6  rounded-full   appearance-none cursor-pointer ${
                          isAutoDebitEnabled ? "bg-green-600" : "bg-red-600"
                        }`}
                        style={{ left: isAutoDebitEnabled ? "1.5rem" : "0" }}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        isAutoDebitEnabled ? "text-green-700" : "text-gray-700"
                      }`}
                    >
                      {isAutoDebitEnabled ? "On" : "Off"}
                    </span>
                  </div>
                </div>
              </form>
            )}

            {/* <Closebtn close={closeModal} /> */}
            <div className="flex justify-center">
              {isViewSummery && (
                <ViewSummery
                  content={{
                    tenure: formData.duration,
                    amount: formData.amount,
                    accountNumber: formData.accountNumber,
                  }}
                  investmentType={investmentType}
                  autoDebit={isAutoDebitEnabled ? "Yes" : "No"}
                />
              )}
            </div>
            <Xbtn close={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestInFDOrRD;
