import React, { useState } from "react";
import { Spring } from "../services/Service";
import { toast } from "react-toastify";
import Base from "../components/Base";
export default function Signup() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const nameChange = (e, property) => {
    setdata({
      ...data,
      [property]: e.target.value,
    });
    // console.log(data);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(data);
    Spring(data)
      .then(() => {
        toast.success("Registerd successfully");
      })
      .catch(() => {
        toast.error("Therre is some error");
      });
  };

  return (
    <Base>
      <section className="gradient-custom ">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration ">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form className="" onSubmit={submitForm}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={(e) => nameChange(e, "name")}
                            type="text"
                            name="name"
                            className="form-control form-control-lg"
                            placeholder="Enter name"
                            value={data.name}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={(e) => nameChange(e, "email")}
                            type="text"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Enter email"
                            value={data.email}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={(e) => nameChange(e, "password")}
                            type="text"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Enter password"
                            value={data.password}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group purple-border">
                      <textarea
                        onChange={(e) => nameChange(e, "about")}
                        placeholder="Enter something ..."
                        className="form-control"
                        name="about"
                        rows="3"
                        value={data.about}
                      ></textarea>
                    </div>
                    <div className="container">
                      <div className="mt-4 pt-2">
                        <input
                          disabled={
                            data.name === "" ||
                            data.about === "" ||
                            data.email === "" ||
                            data.password === ""
                              ? true
                              : false
                          }
                          className="btn btn-dark btn-lg"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
