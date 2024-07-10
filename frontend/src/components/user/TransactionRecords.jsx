import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineMenuBook } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table formatting in PDF
import * as XLSX from "xlsx";
import { FaRegFilePdf } from "react-icons/fa6";
import { TbFileTypeXls } from "react-icons/tb";
{
  /* <FaRegFilePdf />
  <TbFileTypeXls />
  */
}
{
  /* <TbFileTypeXls /> */
}
function TransactionRecords() {
  const [transactions, setTransactions] = useState(null);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state) => state.userSlice.userData);

  const getTransaction = async () => {
    try {
      const result = await userData;
      setData(result);
      console.log("result.data.account.accountNumber ===> ");
      console.log(result.data.account.accountNumber);
      const response = axios.post(
        "http://localhost:3000/api/v1/system//get-transactions",
        {
          accountNumber: result.data.account.accountNumber,
        },
        { withCredentials: true }
      );
      if (response) {
        setTransactions((await response).data);
        setIsOpen(true);
      }
    } catch (error) {
      console.log("Something went wrong to fetching transaction");
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //============Convert into PDF Start============
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Type",
      "Transaction ID",
      "Mode",
      "Location",
      "Branch ID",
      "Name",
      "Amount",
      "Balance",
    ];
    const tableRows = [];

    transactions.data.forEach((transaction) => {
      const transactionData = [
        data.data.account.accountNumber === transaction.receiverAccountNumber
          ? "Credit"
          : "Debit",
        transaction._id,
        transaction.modeOfTransaction,
        transaction.locationPinCode,
        transaction.Deposit_branch_id,
        data.data.account.accountNumber === transaction.receiverAccountNumber
          ? transaction.senderName
          : transaction.receiverName,
        data.data.account.accountNumber === transaction.receiverAccountNumber
          ? `+ ${transaction.amount}`
          : `- ${transaction.amount}`,
        data.data.account.accountNumber === transaction.receiverAccountNumber
          ? transaction.currentBalance[1]
          : transaction.currentBalance[0],
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Transaction Report", 14, 15);
    doc.save(`report_${new Date().toLocaleDateString()}.pdf`);
  };

  //============Convert into PDF End==============

  // ===========Convert into EXCEL Start===============
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      transactions.data.map((transaction) => ({
        Type:
          data.data.account.accountNumber === transaction.receiverAccountNumber
            ? "Credit"
            : "Debit",
        "Transaction ID": transaction._id,
        Mode: transaction.modeOfTransaction,
        Location: transaction.locationPinCode,
        "Branch ID": transaction.Deposit_branch_id,
        Name:
          data.data.account.accountNumber === transaction.receiverAccountNumber
            ? transaction.senderName
            : transaction.receiverName,
        Amount:
          data.data.account.accountNumber === transaction.receiverAccountNumber
            ? `+ ${transaction.amount}`
            : `- ${transaction.amount}`,
        Balance:
          data.data.account.accountNumber === transaction.receiverAccountNumber
            ? transaction.currentBalance[1]
            : transaction.currentBalance[0],
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, `report_${new Date().toLocaleDateString()}.xlsx`);
  };
  //============Convert into Excel End==============
  return (
    <div>
      <button onClick={getTransaction}>
        <MdOutlineMenuBook className="w-[200px] h-[200px]" />
        <span className="text-[10px]">Transaction Records</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100  z-50  ">
          <div className="bg-white p-8 rounded-lg shadow-lg ">
            <div className="h-[400px] overflow-y-scroll scroll-hidden ">
              <div className="w-full flex flex-col items-center justify-center">
                {/* <img src={BankOfBihar} alt="Bank Of Bihar" />
                <p>Name: {data.data.user.name}</p>
                <p>
                  A/C Number:{" "}
                  {getMaskedAccountNumber(data.data.account.accountNumber)}
                </p> */}
                {/* <p>Available Balance: {data.data.account.balance}</p> */}

                {transactions.data.map((e) => {
                  return (
                    <ul key={e._id} className="grid grid-cols-4 py-2">
                      <li className="col-span-2">
                        <p>
                          {" "}
                          {data.data.account.accountNumber ===
                          e.receiverAccountNumber
                            ? "Credit"
                            : "Debit"}
                          /{e._id}/{e.modeOfTransaction}/{e.locationPinCode}
                          {e.Deposit_branch_id}
                        </p>
                        <p>
                          {/* {console.log(
                            data.data.account.accountNumber ===
                              e.receiverAccountNumber,
                            e.receiverName,
                            e.receiverAccountNumber
                          )} */}
                          {data.data.account.accountNumber ===
                          e.receiverAccountNumber
                            ? e.senderName
                            : e.receiverName}
                        </p>
                      </li>
                      <li></li>
                      <li className="">
                        <p>
                          {" "}
                          {data.data.account.accountNumber ===
                          e.receiverAccountNumber ? (
                            <span className=" text-green-600 font-semibold flex items-center">
                              + <FaIndianRupeeSign /> {e.amount}{" "}
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold flex items-center">
                              - <FaIndianRupeeSign /> {e.amount}{" "}
                            </span>
                          )}
                        </p>
                        <p>
                          Balance:{" "}
                          {data.data.account.accountNumber ===
                          e.receiverAccountNumber
                            ? e.currentBalance[1]
                            : e.currentBalance[0]}
                        </p>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-around">
              <button
                className="mt-4 px-3 flex flex-col items-center justify-center  text-black hover:bg-gray-200  py-2 rounded transition duration-500"
                onClick={exportToPDF}
              >
                <FaRegFilePdf />
                <span>Download as PDF</span>
              </button>
              <button
                className="mt-4  px-3 flex flex-col items-center justify-center text-black hover:bg-gray-200 py-2 rounded transition duration-500"
                onClick={exportToExcel}
              >
                <TbFileTypeXls />
                <span>Download as XLS</span>
              </button>
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

export default TransactionRecords;
