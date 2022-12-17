import React from "react";
import NavBar from "./NavBar";

export default function Base(props) {
  return (
    <div className="container-fluid p-0 m-0">
      <NavBar />

      {props.children}
    </div>
  );
}
