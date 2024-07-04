import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function PersonalBankingLogin() {
  return (
    <div className="bg-[#CBC5C5]   py-10  ">
      <div className="bg-[#643BF4] mx-10   flex flex-col items-center py-10 gap-5 justify-center rounded-md shadow-inner ">
        <h3 className="text-[#ffffff] text-6xl">Personal Banking</h3>
        <IoPersonOutline className="text-[#CBC5C5] text-9xl" />
        <Link to={"/login"}>
          <button className="bg-[#CBC5C5] text-[#643BF4] px-20 py-5 w-fit text-4xl rounded-md shadow-2xl shadow-black">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PersonalBankingLogin;
