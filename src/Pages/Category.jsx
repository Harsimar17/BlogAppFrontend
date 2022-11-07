import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../components/Base";
import { ctgryById, postByctgryId } from "../services/Category-service";
import PostContent from "./PostContent";
import SideMenu from "./SideMenu";

export default function Category() {
  const params = useParams();
  const [ctgryList, setctgryList] = useState([]);
  useEffect(() => {
    postByctgryId(Object.values(params)).then((resp) => {
    //   console.log(resp);
      setctgryList(resp);
    });
  }, [ctgryList]);

  return (
    <Base>
      <div className="container " id="simar">
        <div className="row g-0 text-center">
          <div className="col-sm-2 col-md-2 ">
            <SideMenu />
          </div>

          <div className="col-sm-10 col-md-10">
            <h1 align="left" style={{ marginLeft: "13px" }}>
              <span className="badge text-bg-dark">
                {ctgryList.length} NEW POSTS
              </span>
            </h1>
            {ctgryList && ctgryList.map((data, index) => {
              return (
                <div>
                  <PostContent post={data} cont={ctgryList[index]} />
                  <br />
                </div>
              );
            })}
            {ctgryList.length<=0?<h1>No posts yet!!!</h1>:""}
          </div>
        </div>
      </div>
    </Base>
  );
}
