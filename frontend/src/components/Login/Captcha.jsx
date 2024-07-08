import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = () => {
  const onChange = () => {};
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LfG9AYqAAAAAGhi9JxsWyaOfUBB_vQosSnmaeLD"
        onChange={onChange}
      />
    </div>
  );
};

export default Captcha;
