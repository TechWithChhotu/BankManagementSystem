import React, { useState } from "react";
import QRCode from "qrcode.react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import * as htmlToImage from "html-to-image";
import { FaShareAlt } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

const QRCodeGenerator = ({ name, account }) => {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateQRCode = () => {
    const data = {
      name,
      account,
    };
    setQrCodeValue(JSON.stringify(data));
    setIsOpen(true); // Open the modal after generating QR code
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const convertIntoImage = () => {
    let node = document.getElementById("QRCode");

    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        // Create a temporary link element
        const link = document.createElement("a");
        link.download = "qrcode.png"; // Set the download attribute with a filename
        link.href = dataUrl; // Set the href attribute with the data URL
        document.body.appendChild(link); // Append the link to the document body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Clean up: remove the link from the body
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  };

  const shareImage = async () => {
    try {
      let node = document.getElementById("QRCode");

      const blob = await htmlToImage.toBlob(node);
      const file = new File([blob], "qrcode.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Check out this QR Code",
        });
      } else {
        console.error("Sharing not supported on this browser");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div>
      <button onClick={generateQRCode}>
        <MdOutlineQrCodeScanner className="h-[200px] w-[200px]" />
        <span className="text-[10px]">Open QRCode</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div id="QRCode" className="flex items-center justify-center">
              <QRCode value={qrCodeValue} size={300} />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={convertIntoImage}
                className="text-4xl"
                title="Save"
              >
                <MdSaveAlt />
              </button>
              <button onClick={shareImage} className="text-4xl" title="Share">
                <FaShareAlt />
              </button>
            </div>

            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator; /*
///108--- without logo

/*

import React, { useState } from "react";
import QRCode from "qrcode.react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import * as htmlToImage from "html-to-image";

// Import your logo image
import BankOfBihar from "../../assets/BankOfBihar.png";

const QRCodeGenerator = ({ name, account }) => {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateQRCode = () => {
    const data = {
      name,
      account,
    };
    setQrCodeValue(JSON.stringify(data));
    setIsOpen(true); // Open the modal after generating QR code
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const convertIntoImage = () => {
    let node = document.getElementById("QRCode");

    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        // Create a temporary link element
        const link = document.createElement("a");
        link.download = "qrcode.png"; // Set the download attribute with a filename
        link.href = dataUrl; // Set the href attribute with the data URL
        document.body.appendChild(link); // Append the link to the document body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Clean up: remove the link from the body
      })
      .catch(function (error) {
        console.error("Oops, something went wrong!", error);
      });
  };

  const shareQRCode = async () => {
    try {
      const blob = await htmlToImage.toBlob(document.getElementById("QRCode"));
      const file = new File([blob], "qrcode.png", { type: blob.type });

      if (navigator.share) {
        await navigator.share({
          title: "QR Code",
          text: "Check out this QR Code",
          files: [file],
        });
      } else {
        console.log("Sharing not supported.");
        // Provide fallback or notify the user that sharing is not supported
      }
    } catch (error) {
      console.error("Error sharing QR code:", error);
      // Handle error scenario if needed
    }
  };

  return (
    <div>
      <button onClick={generateQRCode}>
        <MdOutlineQrCodeScanner className="h-[200px] w-[200px]" />
        <span className="text-[10px]">Open QRCode</span>
      </button>

    
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div id="QRCode" className="flex items-center justify-center">
              <QRCode
                value={qrCodeValue}
                size={300}
                imageSettings={{
                  src: BankOfBihar,
                  height: 60,
                  width: 60,
                  excavate: true, // Ensures the logo is fully visible
                }}
              />
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={convertIntoImage}>Save Image</button>
              <button onClick={shareQRCode}>Share</button>
            </div>

            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
//96 without logo

*/
