import React, { useState } from "react";

const RdCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState("");
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateRD = () => {
    const deposit = parseFloat(monthlyDeposit);
    const interestRate = parseFloat(rate) / 100 / 4;
    const quarters = parseFloat(time) * 4;

    if (isNaN(deposit) || isNaN(interestRate) || isNaN(quarters)) {
      alert("Please enter valid values");
      return;
    }

    const maturity =
      (deposit * (Math.pow(1 + interestRate, quarters) - 1)) /
      (1 - Math.pow(1 + interestRate, -1 / 3));
    setMaturityAmount(maturity.toFixed(2));
    return maturity.toFixed(2);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2">Monthly Deposit Amount:</label>
        <input
          type="number"
          value={monthlyDeposit}
          onChange={(e) => setMonthlyDeposit(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Amount"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Time Period (years):</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Time period"
        />
      </div>
      <button
        onClick={calculateRD}
        className="w-full py-2 bg-blue-500 text-white rounded-lg"
      >
        Calculate
      </button>
      {maturityAmount && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold">Maturity Amount:</h3>
          <p>{maturityAmount}</p>
        </div>
      )}
    </div>
  );
};

export default RdCalculator;
