import React from "react";

function ConfirmBtn({ handler, text }) {
  return (
    <button
      onClick={handler}
      className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
    >
      {text}
    </button>
  );
}

export default ConfirmBtn;
