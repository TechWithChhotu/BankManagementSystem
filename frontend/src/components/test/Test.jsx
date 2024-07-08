// src/QRCodeGenerator.js

import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ name, account }) => {
  console.log(name, account);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const generateQRCode = () => {
    const data = {
      name,
      account,
    };
    setQrCodeValue(JSON.stringify(data));
  };

  return (
    <div>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeValue && <QRCode value={qrCodeValue} />}
    </div>
  );
};

export default QRCodeGenerator;
