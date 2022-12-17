import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Base from "../components/Base";
import { emailService } from "../services/Service";
import vcont from "../services/VerificationContext";

function Forgot() {
  const [mail, setmail] = useState(null);
  const [flag, setflag] = useState(true);
  const navigate = useNavigate();
  const cont = useContext(vcont);
  useEffect(() => {}, [cont.helper.name]);

  const submit = (e) => {
    e.preventDefault();
    cont.update(mail);
    emailService(mail).then(() => {
      navigate("/OTP");
    });
  };
  return (
    <Base>
      <form onSubmit={submit}>
        <div
          className=" container position-absolute top-50 start-50 translate-middle"
          style={{ textAlign: "center", width: "40%" }}
        >
          <h1 align="left">
            <i>Enter email for verification</i>
          </h1>
          <div className="input-group ">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0 "
                type="radio"
                value=""
                aria-label="Radio button for following text input"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              aria-label="Text input with radio button"
              onChange={(e) => setmail(e.target.value)}
            />
          </div>
          <br />
          <Button
            type="submit"
            className={`btn btn-success ${flag ? "" : "disabled"}`}
            onClick={() => {
              setflag(false);
            }}
          >
            Send OTP
          </Button>
          <br />
          <br />
        </div>
      </form>
    </Base>
  );
}

export default Forgot;
