const calculateRD = (monthlyDeposit, time, rate = 7) => {
  const deposit = parseFloat(monthlyDeposit);
  const interestRate = parseFloat(rate) / 100 / 4;
  console.log("quarterly intreast rage ==> ", interestRate);
  console.log(monthlyDeposit, rate, time);
  const quarters = parseFloat(time) * 4;

  const maturity =
    (deposit * (Math.pow(1 + interestRate, quarters) - 1)) /
    (1 - Math.pow(1 + interestRate, -1 / 3));
  return maturity.toFixed(2);
};

const calculateRDInterest = (monthlyDeposit, time, rate = 7) => {
  const deposit = parseFloat(monthlyDeposit);
  const interestRate = parseFloat(rate) / 100 / 4;
  const quarters = parseFloat(time) * 4;

  const maturity =
    (deposit * (Math.pow(1 + interestRate, quarters) - 1)) /
    (1 - Math.pow(1 + interestRate, -1 / 3));
  return (maturity.toFixed(2) - monthlyDeposit * 12 * time).toFixed(2);
};

const calculateFD = (amount, time, rate = 7) => {
  console.log("Calculate FD Called");
  const principal = parseFloat(amount);
  const interestRate = parseFloat(rate) / 100;
  const timePeriod = parseFloat(time);
  console.log(principal, interestRate, timePeriod);
  const maturity = principal * Math.pow(1 + interestRate, timePeriod);
  return maturity.toFixed(2);
};

const calculateFDInterest = (amount, time, rate = 7) => {
  console.log("Calculate FD Called");
  const principal = parseFloat(amount);
  const interestRate = parseFloat(rate) / 100;
  const timePeriod = parseFloat(time);
  console.log(principal, interestRate, timePeriod);
  const maturity = principal * Math.pow(1 + interestRate, timePeriod);
  return (maturity.toFixed(2) - principal).toFixed(2);
};

export { calculateRD, calculateFD, calculateFDInterest, calculateRDInterest };
