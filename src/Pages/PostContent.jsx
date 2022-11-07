import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { fetchDetails, isLogin } from "../auth/Index";
import { BASE_URL } from "../services/Helper";
// import { allPost } from "../services/Service";
// import Modalcomp from "./Modal";
// import Modal from "./Modal";
export default function PostContent({ post, cont, del }) {
  const [uid, setuid] = useState(null);
  const [pid, setpid] = useState(null);

  useEffect(() => {
    // console.log(post);
    setuid(fetchDetails().id);
    setpid(post.u.id);
    console.log(window.location.pathname);
    // let a = window.location.pathname + "";
    // console.log(a.includes("category"));

    // console.log(post.u.id);
  }, [post]);

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
                post.content.substring(0, post.content.length / 4).toString() +
                "....",
            }}
          ></p>
          <Link to={"/post/" + post.id} className="btn btn-dark">
            Read full article....
          </Link>

          {isLogin() && uid && pid && uid === pid && (
            <Button
              className="btn btn-danger ms-2"
              onClick={(event) => del(post)}
            >
              Delete
            </Button>
          )}
          {isLogin() && uid && pid && uid === pid && (
            <Link
              to={`/user/update/${post.id}`}
              className={`btn btn-warning ms-2 ${
                (window.location.pathname + "").includes("category")
                  ? "disabled"
                  : ""
              }`}
            >
              Update
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
