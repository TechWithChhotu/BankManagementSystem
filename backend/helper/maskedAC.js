function getMaskedAccountNumber(str) {
  // Replace all but the last three characters with 'x'
  const maskedPart = "x".repeat(str.length - 3);
  const visiblePart = str.slice(-3); // Get the last three characters
  return maskedPart + visiblePart;
}
export default getMaskedAccountNumber;
