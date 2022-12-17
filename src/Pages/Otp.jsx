import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Base from "../components/Base";
import { otpVerify } from "../services/Service";

function Otp() {
  const [otp, setotp] = useState("");
  const [flag, setflag] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setflag(false);
    }, 5000);
  }, [flag]);

  const subOTP = (e) => {
    e.preventDefault();
    otpVerify(otp)
      .then((res) => {
        if (res === 200) {
          navigate("/data/changePass");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Base>
      <form onSubmit={subOTP}>
        <div
          className=" container position-absolute top-50 start-50 translate-middle"
          style={{ textAlign: "center", width: "40%" }}
        >
          {flag && (
            <div class="alert alert-success" role="alert">
              An OTP is sent to your Email !!
            </div>
          )}
          <h1 align="left">
            <i>Enter OTP you received</i>
          </h1>
          <div className="input-group ">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0 "
                type="radio"
                placeholder="Enter OTP"
                aria-label="Radio button for following text input"
              />
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              className="form-control"
              aria-label="Text input with radio button"
              onChange={(e) => setotp(e.target.value)}
            />
          </div>
          <br />
          <Button className="btn btn-success">Submit</Button>
          <br />
          <br />
        </div>
      </form>
    </Base>
  );
}

export default Otp;
