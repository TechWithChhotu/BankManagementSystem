class MessageParser {
  constructor(actionProvider, thirdPartyAI) {
    this.actionProvider = actionProvider;
    this.thirdPartyAI = thirdPartyAI;
  }

  async parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Check if the message can be handled by custom logic
    if (lowerCaseMessage.includes("account")) {
      this.actionProvider.handleAccountQuestion();
    } else if (lowerCaseMessage.includes("interest")) {
      this.actionProvider.handleInterestQuestion();
    } else if (lowerCaseMessage.includes("services")) {
      this.actionProvider.handleServicesQuestion();
    } else if (lowerCaseMessage.includes("security")) {
      this.actionProvider.handleSecurityQuestion();
    } else if (lowerCaseMessage.includes("hii")) {
      this.actionProvider.handleHii();
    } else if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.handleHello();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
