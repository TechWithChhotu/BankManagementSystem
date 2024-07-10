import React, { useEffect, useRef, useState } from "react";
import LoginVigilant from "../../assets/Login_1.png";
import { Link } from "react-router-dom";
import Captcha from "./Captcha";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import axios from "axios";
import { toast } from "react-toastify";
import Toastify from "../toastify/Toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/user.slice";
import { useSelector } from "react-redux";

function Login() {
  const notifySuccess = toast.success;
  const navigate = useNavigate();
  const dispach = useDispatch();

  //=================OTP=================
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const [loginResponse, setLoginResponse] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // Virtual Keyboard Setup
  const [virtualKeyboard, setVirtualKeyboard] = useState(false);
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();

  const onChangeAll = (inputs) => {
    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     */
    setInputs({ ...inputs });
    console.log("Inputs changed", inputs);
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });

    inputVal && keyboard.current.setInput(inputVal);
  };

  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };
  // Virtual keyboard setup end

  const HandleLoginSubmit = async (e) => {
    console.log("Type of OTP ==> ", typeof `${otp}`);
    const otpString = otp.join("");
    console.log("Entred OTP ==> ", otpString);
    console.log("Entred OTP length ==> ", otpString.length);

    e.preventDefault();
    console.log(inputs);

    const response = await axios.post(
      `http://localhost:3000/api/v1/system/login`,
      {
        phone: inputs.username,
        password: inputs.password,
        otp: loginResponse ? `${otpString}` : "",
      },
      { withCredentials: true }
    );

    if (otpString.length === 6) {
      setInputs({});
      navigate("/account");
      dispach(setAuth(response.data));
    } else {
      setLoginResponse(true);
      if (response.data.success) {
        notifySuccess(response.data.msg);
      }
    }
  };

  return (
    <div className="">
      <Toastify />
      <div className="grid grid-cols-2 px-5">
        <div className="grid grid-cols-2 py-5 gap-5">
          <div>
            <form onSubmit={HandleLoginSubmit}>
              <ul>
                <li className="mb-4">
                  <p className="font-semibold pb-1">Username</p>
                  <input
                    type="text"
                    name="username"
                    onChange={onChangeInput}
                    value={getInputValue("username")}
                    onFocus={() => setInputName("username")}
                    className="outline-none border border-gray-500 rounded w-[90%] px-3 h-8"
                  />
                </li>
                <li>
                  <p className="font-semibold pb-1">Password</p>
                  <input
                    type="password"
                    name="password"
                    value={getInputValue("password")}
                    onChange={onChangeInput}
                    onFocus={() => setInputName("password")}
                    className="outline-none border border-gray-500 rounded w-[90%] px-3 h-8"
                  />
                </li>
                <li className="mt-5">
                  {/* ==============OTP Section=========== */}
                  {loginResponse ? (
                    <div className="">
                      <h2 className="font-semibold mb-4 text-center">
                        Enter OTP
                      </h2>
                      <div className="flex space-x-2">
                        {otp.map((data, index) => (
                          <input
                            className="w-9 h-9 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Captcha />
                  )}
                </li>
              </ul>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {loginResponse ? "Verify OTP" : "Login"}
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-3 text-blue-600">
            <Link>New User? Apply here</Link>
            <Link>If an account already exists?Activate here</Link>
            <Link>Forgot Password</Link>
            <div
              className="flex gap-3 bg-[#643BF4] text-white pr-2 py-5 self-end pl-7 rounded-tl-full cursor-pointer"
              onClick={() => {
                setVirtualKeyboard((prev) => !prev); // Toggle virtual keyboard
              }}
            >
              <input type="checkbox" checked={virtualKeyboard} readOnly />
              <p>Enable Virtual keyboard</p>
            </div>
          </div>
          {virtualKeyboard && (
            <div className="VirtualKeyboard col-span-2 pr-4">
              <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                inputName={inputName}
                layoutName={layoutName}
                onChangeAll={onChangeAll}
                onKeyPress={onKeyPress}
              />
            </div>
          )}
        </div>

        <div className="">
          <img src={LoginVigilant} alt="Be Vigilant Be Safe" />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
