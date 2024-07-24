import React from "react";

function Closebtn({ close, text = "Close" }) {
  return (
    <button
      className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
      onClick={close}
    >
      {text}
    </button>
  );
}

export default Closebtn;
