import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, fetchDetails, isLogin } from "../auth/Index";
import { BASE_URL } from "../services/Helper";
// import Modalcomp from "../Pages/Modal";
import { allPost } from "../services/Service";
// import { NavLink as ReactLink } from "react-router-dom";

// import { NavLink as REa} from "react-router-dom";

export default function NavBar() {
  const [login, setlogin] = useState(false);
  const navigate = useNavigate();
  const [detail, setdetail] = useState(undefined);
  const [lst, setlst] = useState(undefined);
  useEffect(() => {
    setlogin(isLogin());
    setdetail(fetchDetails());
    console.log(fetchDetails().imagename);
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
    <div className="" >
      <nav className="navbar-nav ms-auto mb-2 mb-lg-0 nav-item navbar navbar-expand-lg navbar-dark bg-dark fixed-top " > 
        <div className="container-fluid bg-dark">
          {/* <Modalcomp/> */}
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
              <li className="nav-item" style={{ display: "flex", marginRight: "10px" }}>
                <Link className="nav-link active" to="/home">
                  Blog App ({lst ? lst.totalelements : 0})
                </Link>
                {/* {isLogin() && <img />} */}
              </li>
              <li className="nav-item" style={{ display: "flex", marginRight: "10px" }} >
                <Link className="nav-link " to="/newFeed">
                  New feed
                </Link>
              </li>
              <li className="nav-item" style={{ display: "flex", marginRight: "10px" }}>
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item dropdown" style={{ display: "flex", marginRight: "10px" }}>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 "  >
              {login === false && (
                <li className="nav-item" key="lin">
                  <Link className="nav-link " aria-current="page" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {login && (
                <>
                  <li className="nav-item" key="hm" style={{ display: "flex", marginRight: "10px" }}>
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
                    style={{ display: "flex", marginRight: "10px" }}
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
                        style={{ marginTop: "2px" }}
                        id="image-selector"
                        className="rounded-circle img-responsive border border-3 border-success "
                        src={`${BASE_URL}/profile/image/${
                          fetchDetails().imagename
                        }`}
                      />
                    </Link>
                  </li>
                  <li className="nav-item" key="lt" style={{ display: "flex", }}>
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
                <li className="nav-item">
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
