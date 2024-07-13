import React, { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PersonalBankingLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const login = useSelector((state) => state.userSlice.login);

  useEffect(() => {
    const checkLogin = async () => {
      const loginStatus = await login;
      setIsLogin(loginStatus);

      console.log("Login (isLogin)=> ", loginStatus);
    };

    checkLogin();
  }, [login]);

  return (
    <div className="bg-[#CBC5C5]   py-10  ">
      <div className="bg-[#643BF4] mx-10   flex flex-col items-center py-10 gap-5 justify-center rounded-md shadow-inner ">
        <h3 className="text-[#ffffff] text-6xl">Personal Banking</h3>
        <IoPersonOutline className="text-[#CBC5C5] text-9xl" />
        <Link to={`${isLogin ? "/account" : "/login"}`}>
          <button className="bg-[#CBC5C5] text-[#643BF4] px-20 py-5 w-fit text-4xl rounded-md shadow-2xl shadow-black">
            {isLogin ? "Go To Account" : "Go for Login"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PersonalBankingLogin;
