import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = () => {
  const onChange = () => {};
  return (
    <div>
      <form>
        <ReCAPTCHA
          sitekey="6LfG9AYqAAAAAGhi9JxsWyaOfUBB_vQosSnmaeLD"
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Captcha;
