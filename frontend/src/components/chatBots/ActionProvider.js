class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleAccountQuestion() {
    const message = this.createChatBotMessage(
      "You can open various types of accounts at Bihar Bank. Let me know if you have a specific account in mind."
    );
    this.addMessageToState(message);
  }

  handleInterestQuestion() {
    const message = this.createChatBotMessage(
      "Our current interest rates for savings accounts are 3.5% per annum."
    );
    this.addMessageToState(message);
  }

  handleServicesQuestion() {
    const message = this.createChatBotMessage(
      "Bihar Bank offers a range of services including account opening, loans, online banking, and more. How can I assist you further?"
    );
    this.addMessageToState(message);
  }

  handleSecurityQuestion() {
    const message = this.createChatBotMessage(
      "Your security is our priority. We have robust measures in place to protect your account. If you have specific concerns, please let me know."
    );
    this.addMessageToState(message);
  }
  handleUnknown() {
    const message = this.createChatBotMessage(
      "I'm not sure how to help with that."
    );
    this.addMessageToState(message);
  }

  handleHello() {
    const message = this.createChatBotMessage(
      "Hello! How can I assist you today?"
    );
    this.addMessageToState(message);
  }
  handleHii() {
    const message = this.createChatBotMessage(
      "Hii! What do you need help with today?"
    );
    this.addMessageToState(message);
  }

  addMessageToState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
