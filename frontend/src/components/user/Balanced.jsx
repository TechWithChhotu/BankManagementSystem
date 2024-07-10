import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import BankOfBihar from "../../assets/BankOfBihar.png";
import getMaskedAccountNumber from "../../helper/getMaskedAc";

function Balanced() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state) => state.userSlice.userData);

  const seeBalance = async () => {
    try {
      setIsOpen(true);
      const result = await userData;
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={seeBalance}>
        <AiOutlineEyeInvisible className="w-[200px] h-[200px]" />
        <span className="text-[10px]">See Balance</span>
      </button>
      {isOpen && data && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100  z-50  ">
          <div className="bg-white p-8 rounded-lg shadow-lg ">
            <div>
              <div className="w-full flex flex-col items-center justify-center">
                <img src={BankOfBihar} alt="Bank Of Bihar" />
                <p>Name: {data.data.user.name}</p>
                <p>
                  A/C Number:{" "}
                  {getMaskedAccountNumber(data.data.account.accountNumber)}
                </p>
                <p>
                  Available Balance:{" "}
                  {data && <span>{data.data.account.balance}</span>}
                </p>
              </div>
            </div>

            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
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

export default Balanced;
