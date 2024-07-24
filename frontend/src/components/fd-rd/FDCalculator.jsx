import React, { useState } from "react";

const FdCalculator = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState("");
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateFD = () => {
    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate) / 100;
    const timePeriod = parseFloat(time);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(timePeriod)) {
      alert("Please enter valid values");
      return;
    }

    const maturity = principal * Math.pow(1 + interestRate, timePeriod);
    setMaturityAmount(maturity.toFixed(2));
  };

  return (
    <div className=" scroll-hidden ">
      <div className="mb-4">
        <label className="block mb-2">Principal Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
        onClick={calculateFD}
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

export default FdCalculator;
