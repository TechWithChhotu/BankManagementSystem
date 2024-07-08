import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import QRCodeGenerator from "../QRCode/QRCodeGenerator";
import QRCodeScanner from "../QRCode/QRCodeScanner";
import { InfinitySpin } from "react-loader-spinner";
import Temp from "../QRCode/Temp";

const UserAccount = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.userSlice.userData);
  useEffect(() => {
    const fetchData = async () => {
      console.log("FetchData form UserAccount");
      console.log(userData);
      try {
        const result = await userData;
        setData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {data ? (
          <div className="grid grid-cols-5 px-10 py-10">
            {/* <div>{data ? JSON.stringify(data) : "No data available"}</div> */}
            <QRCodeGenerator
              name={data.data.user.name}
              account={data.data.account.accountNumber}
            />
            <QRCodeScanner />
            {/* <Temp /> */}
          </div>
        ) : (
          <div>
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
