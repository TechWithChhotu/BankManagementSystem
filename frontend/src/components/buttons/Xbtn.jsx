import React from "react";

function Xbtn({ close }) {
  return (
    <button
      className="absolute top-3 right-3 text-2xl font-bold  text-red-500 "
      title="close"
      onClick={close}
    >
      X
    </button>
  );
}

export default Xbtn;
