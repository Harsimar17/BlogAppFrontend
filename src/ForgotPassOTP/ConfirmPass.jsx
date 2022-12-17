import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Base from "../cmpnts/Base";
import { passUpdate } from "../services/Service";
import vcont from "../Context/VerificationContext";

function ConfirmPass() {
  const [pass, setpass] = useState({});
  const cont = useContext(vcont);
  const handleChange = (e, property) => {
    setpass({
      ...pass,
      [property]: e.target.value,
    });
  };
  const passwordChange = (e) => {
    e.preventDefault();
    passUpdate(cont.helper.name, pass.p).then((resp) => {
    });
  };
  return (
    <Base>
      <div className="container">
        <div className="card">
          <div className="card-header" align="left">
            <h1>Change Password</h1>
          </div>
          <div className="card-body">
            <h5 className="card-title" align="left">
              Create New password
            </h5>
            <br />
            <form align="left" onSubmit={passwordChange}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  <h6>New Password</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => handleChange(e, "p")}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  <h6>Confirm Password</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => handleChange(e, "cp")}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default ConfirmPass;
