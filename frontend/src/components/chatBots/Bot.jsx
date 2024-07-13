import React from "react";
import ActionProvider from "./ActionProvider.js";
import MessageParser from "./MessageParser.js";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../../chatbotConfig.jsx";

function Bot() {
  return (
    <div className="chatbot-container-CKUMAR border rounded-lg shadow-2xl shadow-gray-400">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default Bot;
