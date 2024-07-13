import React, { useState } from "react";
import axios from "axios";
import { AiOutlineMinusCircle } from "react-icons/ai";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { toast } from "react-toastify";
import withdrawMoney from "../../assets/WithdrawMoney.png";

function Withdraw() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    money: "",
    verify: false,
  });
  const [verificationData, setVerificationData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/branch/withdraw",
        formData,
        { withCredentials: true }
      );
      if (response.data.success && !formData.verify) {
        setVerificationData(response.data.data);
        toast.success(response.data.msg);
      } else {
        setIsOpen(false);
        setFormData({ accountNumber: "", money: "", verify: false });
        setVerificationData(null);
      }
    } catch (error) {
      //   console.error("Error withdrawing money:", error);
      toast.error(error.messege);
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
        className="rounded-lg shadow-lg shadow-gray-500 border-t p-2"
      >
        <img src={withdrawMoney} className="w-[200px] h-[200px]" />
        <span className="text-[10px]">Withdraw Money</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <img src={BankOfBihar} alt="Bank Of Bihar" />
              <h2 className="text-2xl font-bold mb-4">Withdraw Money</h2>
            </div>
            <form onSubmit={handleSubmit}>
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  name="money"
                  value={formData.money}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              {verificationData && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    Please verify the following:
                  </p>
                  <img
                    src={verificationData.avatar}
                    alt="Customer Avatar"
                    className="w-24 h-24 mb-4"
                  />
                  <p className="text-gray-700">
                    Signature: {verificationData.signature}
                  </p>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="verify"
                        checked={formData.verify}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">I have verified</span>
                    </label>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Withdraw
                </button>
              </div>
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

export default Withdraw;
