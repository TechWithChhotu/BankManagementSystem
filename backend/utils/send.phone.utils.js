import createTwilioClient from "twilio";
import { generateOTP } from "../helper/helper.js";
import { config } from "dotenv";
import dns from "dns";

config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = createTwilioClient(accountSid, authToken);

// Set custom DNS servers (Google DNS)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const sendOTPonNumber = async (clientPhoneNumber) => {
  try {
    const OTP = generateOTP();
    const message = await twilioClient.messages.create({
      body: `Bank Of Bihar, your verification code is ${OTP}. Thank you team Bank Of Bihar`,
      to: clientPhoneNumber,
      from: "+17078745733", // From a valid Twilio number
    });
    return OTP;
  } catch (err) {
    console.error("Error sending OTP:", err);
    if (err.code === "ENOTFOUND") {
      console.error(
        "DNS resolution error. Please check your network and DNS configuration."
      );
    }
    throw err;
  }
};

export default sendOTPonNumber;
