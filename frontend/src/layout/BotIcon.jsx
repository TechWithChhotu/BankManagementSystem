// FloatingChatbotButton.jsx
import React, { useState, useRef, useEffect } from "react";
import "./FloatingChatbotButton.css"; // Create this CSS file for styling
import Bot from "../components/chatBots/Bot";

const FloatingChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="chatbot-container" ref={chatbotRef}>
      {isOpen && <Bot />}

      {!isOpen && (
        <button className="chatbot-button" onClick={toggleChatbot}>
          {" "}
          <div className="text-5xl">🤖</div>{" "}
        </button>
      )}
    </div>
  );
};

export default FloatingChatbotButton;
