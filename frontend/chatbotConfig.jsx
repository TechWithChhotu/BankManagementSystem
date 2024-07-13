import { createChatBotMessage } from "react-chatbot-kit";
import FAQ from "./src/components/chatBots/FAQ";
import BotAvatar from "./src/components/chatBots/AIbotAvatar";
import Options from "./src/components/chatBots/Options";

const config = {
  botName: "BankBot",
  initialMessages: [createChatBotMessage("Hi! How can I assist you today?")],
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  state: {
    faqOptions: [
      {
        text: "How to open an account?",
        handler: () => {},
        id: 1,
      },
      {
        text: "What are the interest rates?",
        handler: () => {},
        id: 2,
      },
    ],
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  widgets: [
    {
      widgetName: "faqOptions",
      widgetFunc: (props) => <Options {...props} />,
      mapStateToProps: ["faqOptions"],
    },
    {
      widgetName: "faq",
      widgetFunc: (props) => <FAQ {...props} />,
    },
  ],
};

export default config;
