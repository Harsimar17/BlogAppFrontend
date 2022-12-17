import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchDetails } from "../auth/Index";
import { cAt } from "../services/Category-service";

export default function SideMenu() {
  const [ctgry, setctgry] = useState([]);
  useEffect(() => {
    cAt().then((resp) => {
      setctgry(resp);
    });
  }, []);

  return (
    <div className="list-group  shadow-0">
      <div className="dropdown ">
        <button
          className="btn btn-dark btn-lg mt-2 dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {"Category                                     "}
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">
          {ctgry.map((cat) => {
            return (
              <li className="mt-3 ">
                <Link
                  to={"/category/" + cat.id}
                  className="dropdown-item "
                  style={{ borderRadius: "0px" }}
                  aria-current="true"
                >
                  {cat.title.toUpperCase()}
                </Link>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
