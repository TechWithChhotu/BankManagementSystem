// src/components/WhatsNew.jsx
import React from "react";
import { FaRegSmile, FaRobot, FaPiggyBank, FaHeadset } from "react-icons/fa";

const WhatsDifferent = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          What's Different in Bank of Bihar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaPiggyBank className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">High Interest Rates</h3>
            <p>Enjoy higher interest rates on your savings and investments.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaRobot className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">BankBot</h3>
            <p>Introducing our AI-powered BankBot for instant assistance.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaHeadset className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Best Customer Support</h3>
            <p>
              Experience our top-notch customer support for all your banking
              needs.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaRegSmile className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Customer Satisfaction</h3>
            <p>Your satisfaction is our priority. Enjoy our new offerings!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsDifferent;
