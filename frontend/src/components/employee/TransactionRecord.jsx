import React, { useState } from "react";
import axios from "axios";
import { AiOutlineFileSearch } from "react-icons/ai";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table formatting in PDF
import * as XLSX from "xlsx";
import { FaRegFilePdf } from "react-icons/fa6";
import { TbFileTypeXls } from "react-icons/tb";

function TransactionRecords() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAccountNumber("");
    setTransactions([]);
    setErrorMessage(null);
  };

  const fetchTransactionRecords = async (e) => {
    e.preventDefault();
    try {
      console.log("AccountNumber ==> ", accountNumber);
      const response = await axios.post(
        "http://localhost:3000/api/v1/system/get-transactions",
        { accountNumber },
        { withCredentials: true }
      );
      console.log("===============> ", response);
      if (response.data.success) {
        console.log("Transactions Response ==> ");
        console.log(response.data);
        setTransactions(response.data.data);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.data.msg);
      }
    } catch (error) {
      setErrorMessage("Error fetching transaction records. Please try again.");
    }
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
    console.log("transactions ==> ");
    console.log(transactions);
    transactions.forEach((transaction) => {
      const transactionData = [
        accountNumber === transaction.receiverAccountNumber
          ? "Credit"
          : "Debit",
        transaction._id,
        transaction.modeOfTransaction,
        transaction.locationPinCode,
        transaction.Deposit_branch_id,
        accountNumber === transaction.receiverAccountNumber
          ? transaction.senderName
          : transaction.receiverName,
        accountNumber === transaction.receiverAccountNumber
          ? `+ ${transaction.amount}`
          : `- ${transaction.amount}`,
        accountNumber === transaction.receiverAccountNumber
          ? transaction.currentBalance[1]
          : transaction.currentBalance[0],
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("Transaction Report", 14, 15);
    doc.save(`report_${new Date().toLocaleDateString()}.pdf`);
  };

  //============Convert into PDF End==============

  // ===========Convert into EXCEL Start===============
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      transactions.map((transaction) => ({
        Type:
          accountNumber === transaction.receiverAccountNumber
            ? "Credit"
            : "Debit",
        "Transaction ID": transaction._id,
        Mode: transaction.modeOfTransaction,
        Location: transaction.locationPinCode,
        "Branch ID": transaction.Deposit_branch_id,
        Name:
          accountNumber === transaction.receiverAccountNumber
            ? transaction.senderName
            : transaction.receiverName,
        Amount:
          accountNumber === transaction.receiverAccountNumber
            ? `+ ${transaction.amount}`
            : `- ${transaction.amount}`,
        Balance:
          accountNumber === transaction.receiverAccountNumber
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
      <button
        onClick={openModal}
        className="rounded-lg shadow-lg shadow-gray-500 border-t p-2"
      >
        <AiOutlineFileSearch className="w-[200px] h-[200px]" />

        <span className="text-[10px]">Transaction Records</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50 w-screen">
          <div className=" bg-white p-8 rounded-lg shadow-lg ">
            <form onSubmit={fetchTransactionRecords}>
              <div className="mb-4 flex items-center justify-between">
                <div className="">
                  <label className=" text-gray-700 mb-2 pr-5 font-semibold ">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                    }}
                    className="w-[400px] l px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Fetch Records
                </button>
              </div>
            </form>

            {/* Transaction Record */}
            <div>
              {transactions.length > 0 && (
                <div>
                  {" "}
                  <div className="h-[350px] overflow-y-scroll scroll-hidden mt-4 w-full">
                    <div className=" flex flex-col items-center justify-center w-full">
                      {transactions.map((e) => (
                        <ul
                          key={e._id}
                          className=" py-2 w-full grid grid-cols-4"
                        >
                          <li className="col-span-2">
                            <p>
                              {accountNumber === e.receiverAccountNumber
                                ? "Credit"
                                : "Debit"}
                              /{e._id}/{e.modeOfTransaction}/{e.locationPinCode}
                              {e.Deposit_branch_id}
                            </p>
                            <p>
                              {accountNumber === e.receiverAccountNumber
                                ? e.senderName
                                : e.receiverName}
                            </p>
                          </li>
                          <li></li>
                          <li className="">
                            <p>
                              {accountNumber === e.receiverAccountNumber ? (
                                <span className="text-green-600 font-semibold flex items-center">
                                  + <FaIndianRupeeSign /> {e.amount}
                                </span>
                              ) : (
                                <span className="text-red-600 font-semibold flex items-center">
                                  - <FaIndianRupeeSign /> {e.amount}
                                </span>
                              )}
                            </p>
                            <p>
                              Balance:{" "}
                              {accountNumber === e.receiverAccountNumber
                                ? e.currentBalance[1]
                                : e.currentBalance[0]}
                            </p>
                          </li>
                        </ul>
                      ))}
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
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="mt-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
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

export default TransactionRecords;
