import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginU } from "../services/Service";

export default function Login() {
  const [loginDetails, setloginDetails] = useState({
    username: "",
    password: "",
  });

  const handlChange = (e, property) => {
    setloginDetails({
      ...loginDetails,
      [property]: e.target.value,
    });
    console.log(loginDetails.username);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (loginDetails.username === "" || loginDetails.password === "") {
      toast.error("Username or Password is Empty!!");
      return;
    }
    loginU(loginDetails).then((token) => {
      console.log(token);
      toast.success("success");
    });
  };

  return (
    <div className="container  ">
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  onChange={(e) => handlChange(e, "username")}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter email"
                  aria-describedby="emailHelp"
                  value={loginDetails.username}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => handlChange(e, "password")}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password"
                  value={loginDetails.password}
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </p>
        </div>
      </div>
    </div>
  );
}
