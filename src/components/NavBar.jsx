import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, fetchDetails, isLogin } from "../auth/Index";
import cont from "../services/Context";
import { BASE_URL } from "../services/Helper";
import { allPost } from "../services/Service";

export default function NavBar() {
  const [login, setlogin] = useState(false);
  const navigate = useNavigate();
  const [detail, setdetail] = useState(undefined);
  const [lst, setlst] = useState(undefined);
  let cvalue = useContext(cont);
  useEffect(() => {
    setlogin(isLogin());
    setdetail(fetchDetails());
    allPost().then((data) => {
      setlst(data);
    });
  }, [login, lst]);

  const logOut = () => {
    doLogout(() => {
      setlogin(false);
      navigate("/");
    });
  };
  return (
    <div className="">
      <nav className="navbar-nav ms-auto mb-2 mb-lg-0 nav-item navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
        <div className="container-fluid bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li
                className="nav-item"
                style={{ display: "flex", marginRight: "10px" }}
              >
                <Link className="nav-link active" to="/home">
                  Blog App ({lst ? lst.totalelements : 0})
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ display: "flex", marginRight: "10px" }}
              >
                <Link className="nav-link " to="/newFeed">
                  New feed
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ display: "flex", marginRight: "10px" }}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li
                className="nav-item dropdown"
                style={{ display: "flex", marginRight: "10px" }}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/service">
                      Service
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/home">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/home">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              {login === false && (
                <li className="nav-item" key="lin" style={{ display: "flex" }}>
                  <Link className="nav-link " aria-current="page" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {login && (
                <>
                  <li
                    className="nav-item"
                    key="hm"
                    style={{
                      display: "flex",
                      marginRight: "10px",
                      marginTop: "7px",
                    }}
                  >
                    <div className="d-flex">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search any post "
                        aria-label="Search"
                        style={{ height: "40px", width: "300px" }}
                        value={Object.values(cvalue.helper)}
                        onChange={(e) => {
                          cvalue.update(e.target.value);
                        }}
                      />
                    </div>
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={`/user/info/${detail.id}`}
                    >
                      Profile info
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    style={{
                      display: "flex",
                      marginRight: "10px",
                      marginTop: "7px",
                    }}
                    key="pg"
                  >
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/user/dashboard"
                    >
                      <b>Signed in as</b> {detail.name.toUpperCase()}
                    </Link>
                    <Link to={`/user/info/${detail.id}`}>
                      <img
                        width={50}
                        style={{ marginTop: "0px" }}
                        id="image-selector"
                        className="rounded-circle img-responsive border border-3 border-success "
                        src={`${BASE_URL}/profile/image/${
                          fetchDetails().imagename
                        }`}
                        alt=""
                      />
                    </Link>
                  </li>
                  <li
                    className="nav-item check"
                    key="lt"
                    style={{ display: "flex", marginTop: "7px" }}
                  >
                    <a
                      onClick={logOut}
                      className="nav-link "
                      aria-current="page"
                      href="/login"
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
              {login === false && (
                <li className="nav-item" style={{ display: "flex" }}>
                  <Link className="nav-link " to="/signup">
                    Signup
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
