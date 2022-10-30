import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/Helper";
import { allPost } from "../services/Service";
export default function PostContent({ post, cont }) {
  return (
    <div className="container" align="left">
      <div
        className="card border-0 shadow-sm text"
        style={{ backgroundColor: "white" }}
      >
        
        <div className="card-body">
       
          <h1 className="card-title">{post.title.toUpperCase()} </h1>
          <div className="image">
          <img
            src={`${BASE_URL}/api/post/show/${cont.imagename}`}
            className="card-img-top imgsh"
            alt="..."
            // style={{boxSizing:"10px"}}
          />
        </div>
          <p
            className="card-text "
            dangerouslySetInnerHTML={{
              __html:
                post.content.substring(0, post.content.length / 4) + "....",
            }}
          ></p>
          <Link to={"/post/" + post.id} className="btn btn-dark">
            Read full article....
          </Link>
        </div>
      </div>
    </div>
  );
}
