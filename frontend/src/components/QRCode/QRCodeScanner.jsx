import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import { toast } from "react-toastify";
import { LuScanLine } from "react-icons/lu";
import BankOfBihar from "../../assets/BankOfBihar.png";
import { FaIndianRupeeSign } from "react-icons/fa6";

const QRCodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const scannerRef = useRef(null);
  const notifySuccess = toast.success;
  const [refresh, setRefresh] = useState(false);
  const [amount, setAmount] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      startScan();
    }

    return () => {
      if (scannerRef.current) {
        stopScan();
      }
    };
  }, [isScanning]);

  useEffect(() => {
    if (paymentInProcess && inputRef.current) {
      inputRef.current.focus();
    }
  }, [paymentInProcess]);

  const startScan = async () => {
    setScannedData(null);
    setError(null);
    setIsScanning(true);

    await scannerRef.current
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          const parsedData = JSON.parse(decodedText);
          setScannedData(parsedData);
          stopScan();
        },
        (err) => {
          if (
            err ===
            "QR code parse error, error = NotFoundException: No MultiFormat Readers were able to detect the code."
          ) {
            setError("Error while scanning, please choose from image");
          }
        }
      )
      .catch((err) => {
        console.warn(err);
        setError("Error initializing the scanner. Please try again.");
        setIsScanning(false);
      });
  };

  const stopScan = async () => {
    if (scannerRef.current && isScanning) {
      await scannerRef.current.stop();
      scannerRef.current.clear();
      setIsScanning(false);
    }
  };
  const scanFromFile = (e) => {
    stopScan(); // Stop current scan before scanning from file
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const scanner = new Html5Qrcode("qr-reader");
    scanner
      .scanFile(file, true)
      .then((text) => {
        try {
          const parsedData = JSON.parse(text);
          setScannedData(parsedData);
          setPaymentInProcess(true);
        } catch (err) {
          console.error("Error parsing scanned data:", err);
          setError("Error parsing scanned data. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error scanning file:", err);
        setError("Error scanning file. Please try again.");
      })
      .finally(() => {
        setIsScanning(false);
        scanner
          .stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      });
  };

  const scanToPay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/scan-to-pay",
        {
          name: scannedData.name,
          account: scannedData.account,
          money: parseInt(amount.replace(/,/g, "")),
        },
        { withCredentials: true }
      );

      if (response) {
        setPaymentInProcess(false);
        setScannedData(null);
        setIsScanning(false);
        setError(null);
        notifySuccess("Payment successfully completed");
        setRefresh(true);
        setAmount("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(numericValue);
    return formattedValue;
  };

  const handleAmountChanges = (e) => {
    const value = e.target.value;
    const formattedValue = formatAmount(value);
    setAmount(formattedValue);
  };

  return (
    <div className={isScanning ? "blur-background" : ""}>
      {!isScanning && !paymentInProcess && (
        <button onClick={() => setIsScanning(true)}>
          <LuScanLine className="w-[200px] h-[200px]" />
          <span className="text-[10px]">Scan QR Code</span>
        </button>
      )}

      {error && (
        <p style={{ color: "red" }} className="w-[500px] text-center">
          {error}
        </p>
      )}

      {(isScanning || scannedData != null) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {!paymentInProcess && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div id="qr-reader" style={{ width: "500px" }}></div>
              <div
                onClick={() => document.getElementById("ScanFomFile").click()}
                className="text-center w-[500px] mt-4"
              >
                <input
                  type="file"
                  id="ScanFomFile"
                  accept="image/*"
                  className="hidden h-10 bg-blue-600 font-bold border mt-2"
                  onChange={scanFromFile}
                />
                <span className="cursor-pointer">Choose from file</span>
              </div>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={async () => {
                  stopScan();
                  setError("");
                  setIsScanning(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {paymentInProcess && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {/* Account info */}
              <div>
                {paymentInProcess && (
                  <div className="w-full flex flex-col items-center justify-center">
                    <img src={BankOfBihar} alt="Bank Of Bihar" />
                    <p>name: {scannedData.name}</p>
                    <p>account: {scannedData.account}</p>
                  </div>
                )}
              </div>

              {/* Payment Btn */}
              {scannedData && paymentInProcess && (
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-full max-w-md">
                    <FaIndianRupeeSign className="text-4xl" />
                    <input
                      type="text"
                      id="amount"
                      className="outline-none text-4xl w-full text-center"
                      placeholder="0"
                      value={amount}
                      onChange={handleAmountChanges}
                      ref={inputRef}
                    />
                  </div>
                  <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 max-w-md"
                    onClick={scanToPay}
                  >
                    Pay
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
// its work without logo
