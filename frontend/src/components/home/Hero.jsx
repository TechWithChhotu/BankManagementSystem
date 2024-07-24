// src/components/Services.jsx
import React from "react";
import {
  FaUserPlus,
  FaSignInAlt,
  FaUserAlt,
  FaCreditCard,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
  FaMoneyBillWave,
  FaUserShield,
  FaBuilding,
} from "react-icons/fa";

const servicesData = [
  {
    icon: <FaSignInAlt className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Login",
    description: "Employees and customers can log in to their accounts.",
  },

  {
    icon: <FaMoneyCheckAlt className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Transaction Records",
    description: "View transaction history and details.",
  },
  {
    icon: <FaCreditCard className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Issue ATM Card",
    description: "Request and issue ATM cards for customers.",
  },
  {
    icon: <FaCreditCard className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Block ATM Card",
    description: "Block ATM cards if lost or stolen.",
  },
  {
    icon: <FaCreditCard className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Activate ATM Card",
    description: "Activate newly issued ATM cards.",
  },
  {
    icon: <FaHandHoldingUsd className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Invest in FD",
    description: "Invest in Fixed Deposits for higher returns.",
  },
  {
    icon: <FaHandHoldingUsd className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Invest in RD",
    description: "Invest in Recurring Deposits for regular savings.",
  },
  {
    icon: <FaBuilding className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Open Account",
    description: "Open new bank accounts with ease.",
  },
  {
    icon: <FaMoneyBillWave className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Deposit Money",
    description: "Deposit money into your bank account.",
  },
  {
    icon: <FaMoneyBillWave className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Withdraw Money",
    description: "Withdraw money from your bank account.",
  },
  {
    icon: <FaUserShield className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Enable Internet Banking",
    description: "Enable or disable internet banking for accounts.",
  },
  {
    icon: <FaBuilding className="text-blue-600 text-6xl mb-4 mx-auto" />,
    title: "Scan to Pay",
    description: "Use the Scan to Pay feature for quick payments.",
  },
];

const Services = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              {service.icon}
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
