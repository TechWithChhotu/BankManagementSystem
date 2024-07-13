import React, { useState } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { toast } from "react-toastify";
import AddMoney from "../../assets/AddMoney.png";
function Deposit() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    money: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/branch/deposite",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        setSuccessMessage(response.data.msg);
        toast.success(response.data.msg);
        setTimeout(() => {
          closeModal();
        }, 2000); // Close modal after 2 seconds
      } else {
        console.error("Deposit failed:", response.data.msg);
      }
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({ accountNumber: "", money: "" });
    setSuccessMessage(null);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-lg shadow-lg shadow-gray-500 border-t p-2"
      >
        <img src={AddMoney} className="w-[200px] h-[200px]" />
        <span className="text-[10px]">Deposit Money</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <img src={BankOfBihar} alt="Bank Of Bihar" />
              <h2 className="text-2xl font-bold mb-4">Deposit Money</h2>
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Deposit
                </button>
              </div>
              {successMessage && (
                <div className="mt-4 text-green-500 text-center">
                  {successMessage}
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

export default Deposit;
