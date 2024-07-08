// const moment = require("moment-timezone");
import moment from "moment-timezone";

const utcToIstTimeConverter = (utcDateStr) => {
  // Your UTC time as a string
  // const utcDateStr = "2024-07-07T06:23:29.431Z";

  // Convert to IST using moment-timezone
  const istDate = moment
    .utc(utcDateStr)
    .tz("Asia/Kolkata")
    .format("DD-MM-YYYY HH:mm:ss");
  return istDate;
};

export default utcToIstTimeConverter;
