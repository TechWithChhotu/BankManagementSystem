import createTwilioClient from "twilio";
import { config } from "dotenv";
config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = createTwilioClient(accountSid, authToken);

const sendSMSonNumber = async (clientPhoneNumber, msg) => {
  try {
    // console.log(`Client Phone Number => ${clientPhoneNumber}`);

    return await twilioClient.messages
      .create({
        body: `Bank Of Bihar, ${msg} ThankU team Bank Of Bihar`,
        to: clientPhoneNumber,
        from: "+17078745733", // From a valid Twilio number
      })
      .then((message) => {
        return message;
      });
  } catch (err) {
    console.log(err);
  }
};

export default sendSMSonNumber;
