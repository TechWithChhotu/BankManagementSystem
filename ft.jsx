import React, { useState, useRef } from "react";
import LoginVigilant from "../../assets/Login_1.png";
import { Link } from "react-router-dom";
import Captcha from "./Captcha";
import VirtualKeyboard from "./VirtualKeyboard";

function Login() {
  const [virtualKeyboard, setVirtualKeyboard] = useState(false);
  const activeInputRef = useRef(null);

  const handleInputFocus = (event) => {
    activeInputRef.current = event.target;
  };

  return (
    <div>
      <div className="grid grid-cols-2 px-5 ">
        <div className="grid grid-cols-2 py-5 gap-5">
          <div>
            <form>
              <ul>
                <li>
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    onFocus={handleInputFocus}
                  />
                </li>
                <li>
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    onFocus={handleInputFocus}
                  />
                </li>
                <li>
                  <Captcha />
                </li>
              </ul>
            </form>
          </div>
          <div className="flex flex-col gap-3 text-blue-600">
            <Link>New User? Apply here/Activate</Link>
            <Link>Forgot Password</Link>
            <div
              className="flex gap-3 bg-[#643BF4] text-white pr-2 py-5 self-end pl-7 rounded-tl-full cursor-pointer"
              onClick={() => {
                setVirtualKeyboard(!virtualKeyboard);
              }}
            >
              <input type="checkbox" checked={virtualKeyboard} readOnly />
              <p>Enable Virtual keyboard</p>
            </div>
          </div>
        </div>
        <div className="">
          {virtualKeyboard ? (
            <VirtualKeyboard activeInputRef={activeInputRef} />
          ) : (
            <img src={LoginVigilant} alt="Be Vigilant Be Safe" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
