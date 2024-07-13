import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { setAuth } from "../../store/user.slice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OpenAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const initialFormData = {
    name: "",
    password: "",
    phone: "",
    email: "",
    adharNumber: "",
    panNumber: "",
    balance: "",
    accountType: "Saving Account",
    isATMCard: false,
    avatar: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/branch/open-account",
        data,
        { withCredentials: true }
      );
      if (response.data) {
        toast.success(response.data.msg);
        dispatch(setAuth(response.data));
        setFormData(initialFormData);
        setIsOpen(false);
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error(error.messege);
    } finally {
      setIsLoading(false);
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
        <AiOutlinePlusCircle className="w-[200px] h-[200px]" />
        <span className="text-[10px]">Open Account</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
          <div className="bg-white  p-8 rounded-lg shadow-lg w-[800px]">
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <img
                src={BankOfBihar}
                alt="Bank Of Bihar"
                className="w-[200px]"
              />
              <h2 className="text-xl font-bold mb-2">Open New Account</h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-x-20 px-10  h-[400px] overflow-hidden overflow-y-scroll scroll-hidden"
            >
              <div className="mb-4 grid ">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Adhar Number</label>
                <input
                  type="text"
                  name="adharNumber"
                  value={formData.adharNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Balance</label>
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="Saving Account">Saving Account</option>
                  <option value="Current Account">Current Account</option>
                  <option value="Recurring Deposit Account">
                    Recurring Deposit Account
                  </option>
                  <option value="Zero Balance Saving Account">
                    Zero Balance Saving Account
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ATM Card</label>
                <input
                  type="checkbox"
                  name="isATMCard"
                  checked={formData.isATMCard}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Request ATM Card</span>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex justify-center col-span-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full  py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating....." : " Create Account"}
                </button>
              </div>
            </form>
            <div className=" w-full flex justify-center">
              <button
                className="mt-4 w-full mx-10 bg-red-500  text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenAccount;
