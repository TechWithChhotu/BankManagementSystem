// import React, { useState } from "react";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import InternetBanking from "../../assets/InternetBanking.png";
// import { toast } from "react-toastify";

// function EnableInternetBanking() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [accountNumber, setAccountNumber] = useState("");

//   const handleInputChange = (e) => {
//     setAccountNumber(e.target.value);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setAccountNumber("");
//   };

//   const enableInternetBanking = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/branch/enable-internet-banking",
//         { accountNumber },
//         { withCredentials: true }
//       );
//       if (response.data.success) {
//         toast.success(response.data.msg);
//         closeModal();
//       } else {
//         toast.error(response.data.msg);
//       }
//     } catch (error) {
//       toast.error("Error enabling internet banking. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <button onClick={openModal}>
//         <img src={InternetBanking} className="w-[200px] h-[200px]" />
//         <span className="text-[10px]">Deposit Money</span>
//       </button>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
//             <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
//               Enable Internet Banking
//             </h2>
//             <form onSubmit={enableInternetBanking}>
//               <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-medium mb-2">
//                   Account Number
//                 </label>
//                 <input
//                   type="text"
//                   name="accountNumber"
//                   value={accountNumber}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter  account number"
//                   required
//                 />
//               </div>
//               <div className="flex justify-center mb-6">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//                 >
//                   Enable
//                 </button>
//               </div>
//             </form>
//             <button
//               className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EnableInternetBanking;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import BankOfBihar from "../../assets/BankOfBihar.png";
import "react-toastify/dist/ReactToastify.css";
import InternetBanking from "../../assets/InternetBanking.png";

function InternetBankingToggle() {
  const [accountNumber, setAccountNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [action, setAction] = useState("");

  const getAccountData = async (actionType) => {
    try {
      setAction(actionType);
      const response = await axios.post(
        "http://localhost:3000/api/v1/branch/enable-internet-banking",
        { accountNumber, action: "verify" },
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log(response.data);
        setAccountDetails(response.data.data);
        setIsOpen(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error fetching account details. Please try again.");
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAccountNumber("");
    setAccountDetails(null);
  };

  const handleInputChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAction = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/branch/enable-internet-banking",
        { accountNumber, action },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        closeModal();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error processing request. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-lg shadow-lg shadow-gray-500 border-t p-2"
      >
        <img src={InternetBanking} alt="" className="w-[200px] h-[200px]" />
        <span className="text-[10px]">Enable/Disable Internet Banking</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            {/*  */}
            {!accountDetails && (
              <div>
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
                <div className="flex justify-between">
                  <button
                    onClick={() => getAccountData("enable")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Enable
                  </button>
                  <button
                    onClick={() => getAccountData("disable")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Disable
                  </button>
                </div>
              </div>
            )}
            {/*  */}
            {accountDetails && (
              <div>
                <div className="w-full flex flex-col items-center justify-center mb-4">
                  <img
                    src={BankOfBihar}
                    alt="Bank Of Bihar"
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h2 className="text-xl font-bold mb-4">
                    Account Verification
                  </h2>
                  <p>Name: {accountDetails.user.name}</p>
                  <p>Aadhaar Number: {accountDetails.user.adharNumber}</p>
                  <img
                    src={accountDetails.user.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <img
                    src={accountDetails.signature}
                    alt="Signature"
                    className="w-24 h-24 mb-4"
                  />
                  <p>
                    Please verify the above details with the account holder's
                    Aadhaar and face.
                  </p>
                </div>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={handleAction}
                >
                  {action === "enable" ? "Enable" : "Disable"} Internet Banking
                </button>
              </div>
            )}{" "}
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

export default InternetBankingToggle;
