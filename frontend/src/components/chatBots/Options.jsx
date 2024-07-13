import React from "react";

const Options = (props) => {
  const options = props.options.map((option) => (
    <button key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));

  return <div className="options-container">{options}</div>;
};

export default Options;
