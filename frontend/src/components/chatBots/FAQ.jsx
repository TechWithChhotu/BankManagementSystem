import React from "react";

const FAQ = (props) => {
  return (
    <div className="faq">
      <p>Here are some frequently asked questions:</p>
      <ul>
        <li>
          How to open an account? - You can open an account by visiting our
          branch or online.
        </li>
        <li>
          What are the interest rates? - The interest rates vary based on the
          account type.
        </li>
        {/* Add more FAQs as needed */}
      </ul>
    </div>
  );
};

export default FAQ;
