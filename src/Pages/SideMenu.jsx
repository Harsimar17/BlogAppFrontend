import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
      {ctgry.map((cat) => {
        return (
          <Link
            to={"/category/" + cat.id}
            className="list-group-item list-group-item-action btn btn-secondary"
            style={{ borderRadius: "0px" }}
            aria-current="true"
          >
            {cat.title.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
