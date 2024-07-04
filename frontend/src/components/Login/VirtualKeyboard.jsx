import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const VirtualKeyboard = ({ activeInputRef, setInputValue }) => {
  const [layoutName, setLayoutName] = useState("default");

  const handleInputChange = (input) => {
    if (activeInputRef.current) {
      setInputValue(activeInputRef.current.name, input);
    }
  };

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  return (
    <div>
      <Keyboard
        layoutName={layoutName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            "1 2 3 4 5 6 7 8 9 0 {bksp}",
            "q w e r t y u i o p",
            "a s d f g h j k l {enter}",
            "{shift} z x c v b n m , . {shift}",
            "{space}",
          ],
          shift: [
            "! @ # $ % ^ & * ( ) {bksp}",
            "Q W E R T Y U I O P",
            "A S D F G H J K L {enter}",
            "{shift} Z X C V B N M < > {shift}",
            "{space}",
          ],
        }}
        display={{
          "{bksp}": "←",
          "{enter}": "↵",
          "{shift}": "⇧",
          "{space}": " ",
        }}
      />
    </div>
  );
};

export default VirtualKeyboard;
