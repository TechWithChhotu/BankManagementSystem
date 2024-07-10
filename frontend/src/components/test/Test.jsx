import React, { useState } from "react";
import axios from "axios";

const MobileNumberGeolocation = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const getGeolocation = async () => {
    const formattedNumber = `+${mobileNumber.replace(/\D/g, "")}`;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/lookup?number=${formattedNumber}`
      );
      setInfo(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setInfo(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={mobileNumber}
        onChange={handleInputChange}
        placeholder="Enter mobile number with country code"
      />
      <button onClick={getGeolocation}>Get Info</button>

      {info && (
        <div>
          <p>Carrier: {info.carrier.name}</p>
          <p>Country Code: {info.countryCode}</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MobileNumberGeolocation;
