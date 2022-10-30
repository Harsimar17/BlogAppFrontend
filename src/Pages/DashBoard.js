import React from "react";
import Base from "../components/Base";
import AddPost from "../routes/AddPost";

export default function DashBoard() {
  return (
    <Base>
      <div className="container">
        <AddPost />
      </div>
    </Base>
  );
}
