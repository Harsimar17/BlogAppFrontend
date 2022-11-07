import React from "react";
import Base from "../components/Base";
import AllPost from "./AllPost";
import SideMenu from "./SideMenu";

export default function Home() {
  return (
    <Base>
      <div className="container " id="simar">
        <div className="row g-0 text-center">
          <div className="col-sm-2 col-md-2 ">
            <SideMenu />
          </div>

          <div className="col-sm-10 col-md-10">
            <AllPost />
          </div>
        </div>
      </div>
    </Base>
  );
}
