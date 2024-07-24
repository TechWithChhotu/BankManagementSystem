import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { toast } from "react-toastify";
import Closebtn from "../buttons/Closebtn";
import Confirm from "../buttons/ConfirmBtn";
import {
  calculateFD,
  calculateRD,
  calculateFDInterest,
  calculateRDInterest,
} from "./calculate";
import getMaskedAccountNumber from "../../helper/getMaskedAc";

function ViewSummery({ content, investmentType = "FD", autoDebit }) {
  console.log("investmentType===> ", investmentType);
  const isYouEmployeeState = useSelector(
    (state) => state.userSlice.isYouEmployee
  );
  const [isOpen, setIsOpen] = useState(false);

  const userData = useSelector((state) => state.userSlice.userData);
  console.log("UserData ======> ");
  console.log(userData);
  const [userInfo, setUserInfo] = useState(userData);

  useEffect(() => {
    const fetched = async () => {
      const result = await userData;
      setUserInfo(result);
    };
    fetched();
  }, [userData]);

  const handleInvest = async () => {
    if (confirm("Are you sure to invest")) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/system/invest-${investmentType.toLowerCase()}`,

          {
            amount: content.amount,
            timePeriod: content.tenure,
            rate: 7,
            autoDebit: autoDebit === "Yes" ? true : false,
          },
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success(response.data.msg);
          setIsOpen(false);
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
    setIsOpen(false);
  };

  const date = new Date();
  const amount = parseInt(content.amount);
  const time = parseInt(content.tenure);
  console.log(amount);
  console.log(time);
  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="mt-4 w-full bg-blue-500 px-10 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 "
      >
        View summery
      </button>
      {isOpen && (
        <div className="fixed  inset-0 flex  items-center justify-center bg-black bg-opacity-0 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full  py-12 max-w-md  relative">
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <img src={BankOfBihar} alt="Bank Logo" className="w-40" />
              <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            </div>

            <div className="">
              <div className="grid gap-3    text-xl mb-5">
                <p>
                  Account Number:{" "}
                  {console.log(typeof `${userInfo.data.user.accountNumber}`)}
                  {console.log(`${userInfo.data.user.accountNumber}`)}
                  {userInfo &&
                    getMaskedAccountNumber(
                      `${userInfo.data.account.accountNumber}`
                    )}
                </p>
                <p>Amount: {content.amount}</p>
                <p>Tenure: {content.tenure}</p>

                <p>Interest Rate: {7}% Annually</p>
                <p>
                  Maturity Date:{" "}
                  {`${date.getDate()}/${date.getMonth() + 1}/${
                    parseInt(date.getFullYear()) + parseInt(content.tenure)
                  }`}
                </p>
                <p>
                  Interest Amount:{" "}
                  {investmentType === "FD"
                    ? calculateFDInterest(amount, time)
                    : calculateRDInterest(amount, time)}
                </p>
                <p>
                  Maturity Amount:{" "}
                  {investmentType === "FD"
                    ? calculateFD(amount, time)
                    : calculateRD(amount, time)}
                </p>
                {investmentType === "RD" && <p>Auto-debit: {autoDebit}</p>}
                {investmentType === "RD" && (
                  <p>
                    Monthly Installment Date: On the {date.getDate()}th of every
                    Month
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Closebtn close={closeModal} text="Edit" />
                <Confirm handler={handleInvest} text={"Confirm"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSummery;
