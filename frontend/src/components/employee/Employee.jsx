import React from "react";
import OpenAccount from "./OpenAccount";
import { MdOutlineAccountBalance } from "react-icons/md";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import CheckBalance from "./CheckBankBalance";
import TransactionRecords from "./TransactionRecord";
import EnableInternetBanking from "./EnableInternetBanking";

function Employee() {
  return (
    <div className="flex justify-center ">
      <div className="grid grid-cols-4  py-10 gap-y-16  gap-x-16">
        <OpenAccount />
        <Withdraw />
        <Deposit />
        <CheckBalance />
        <TransactionRecords />
        <EnableInternetBanking />
      </div>
    </div>
  );
}

export default Employee;
