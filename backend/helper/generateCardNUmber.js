import { ATMCard } from "../models/v1_models.mongoDB.js";

async function generateUniqueCardNumber() {
  let isUnique = false;
  let cardNumber;

  while (!isUnique) {
    cardNumber = generateCardNumber();
    const existingCard = await ATMCard.findOne({ card_number: cardNumber });
    if (!existingCard) {
      isUnique = true;
    }
  }

  return cardNumber;
}

function generateCardNumber() {
  const cardNumberWithoutCheckDigit = generateRandomNumber(15);
  const checkDigit = calculateLuhnCheckDigit(cardNumberWithoutCheckDigit);
  return cardNumberWithoutCheckDigit + checkDigit;
}

function generateRandomNumber(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  console.log("type of Card ===> ", typeof result);
  return result;
}

function calculateLuhnCheckDigit(number) {
  let sum = 0;
  let shouldDouble = true;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  const mod10 = sum % 10;
  return mod10 === 0 ? 0 : 10 - mod10;
}

export default generateUniqueCardNumber;
