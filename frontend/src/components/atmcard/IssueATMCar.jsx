import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCreditCard1 } from "react-icons/ci";
import BankOfBihar from "../../assets/BankOfBihar.png";

import { toast } from "react-toastify";
import atmCardImage from "../../assets/atm-machine.png";
import { useSelector } from "react-redux";

function IssueAtmCard() {
  const isYouEmployeeState = useSelector(
    (state) => state.userSlice.isYouEmployee
  );
  const [isYouEmployee, setIsYouEmployee] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    pin: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  console.log("IS OPen ================> ", isOpen);

  //   useEffect(() => {
  //     const response = async () => {
  //       const result = await isYouEmployeeState;
  //       setIsYouEmployee(result);
  //       console.log("isYouEmployeeState (user)", result);
  //     };

  //     response();
  //   }, [isYouEmployeeState]);
  //   console.log("isYouEmployeeState (user)", result);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSetPin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/system/get-atm-card",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.msg);
        setIsOpen(false);
        setFormData({ accountNumber: "", pin: "", otp: "" });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to issue ATM card.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/system/get-atm-card",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success(response.data.msg);
        setOtpVerified(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Failed to issue ATM card.");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/system/get-atm-card",
        { accountNumber: formData.accountNumber },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoading(false);
        toast.success("OTP sent to your registered mobile number.");
        setOtpSent(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      if (error.response.status === 409) {
        setFormData({
          accountNumber: "",
          pin: "",
          otp: "",
        });
        setIsOpen(false);
      }
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-lg shadow-lg shadow-gray-500 border-t p-2 bg-emerald-50 "
      >
        <CiCreditCard1 className="w-40 h-40" />
        <span className="text-[10px]">Issue ATM Card</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
            <div className="w-full flex flex-col items-center justify-center mb-4 ">
              <img src={BankOfBihar} alt="Bank Logo" />
              <h2 className="text-2xl font-bold mb-4">Issue ATM Card</h2>
            </div>
            <form>
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
              {!otpSent && (
                <div className="mb-4 w-full flex justify-center">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {isLoading ? "Sending........." : "Send OTP"}
                  </button>
                </div>
              )}
              {otpSent && (
                <>
                  {!otpVerified && (
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">OTP</label>
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        required
                      />
                    </div>
                  )}
                  {otpVerified && (
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">PIN</label>
                      <input
                        type="password"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        required
                      />
                    </div>
                  )}
                </>
              )}
              {otpSent && (
                <div className="flex justify-center">
                  {otpVerified ? (
                    <button
                      onClick={handleSetPin}
                      disabled={isLoading}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {isLoading ? "Seting pin......." : "set Pin"}
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyOtp}
                      disabled={isLoading}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {isLoading ? "Verifying...." : "Verify OTP"}
                    </button>
                  )}
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

export default IssueAtmCard;
