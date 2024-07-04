import createTwilioClient from "twilio";
import { generateOTP } from "../helper/helper.js";
import { config } from "dotenv";
config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = createTwilioClient(accountSid, authToken);

const sendOTPonNumber = async (clientPhoneNumber) => {
  try {
    // console.log(`Client Phone Number => ${clientPhoneNumber}`);

    const OTP = generateOTP();
    return await twilioClient.messages
      .create({
        body: `Bank Of Bihar, your varification code is ${OTP}. ThankU team Bank Of Bihar`,
        to: clientPhoneNumber,
        from: "+13146681538", // From a valid Twilio number
      })
      .then((message) => {
        return OTP;
      });
  } catch (err) {
    console.log(err);
  }
};

export default sendOTPonNumber;
