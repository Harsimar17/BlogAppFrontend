import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { fetchDetails, isLogin } from "../auth/Index";
import { BASE_URL } from "../services/Helper";
export default function PostContent({ post, del }) {
  const [uid, setuid] = useState(null);
  const [pid, setpid] = useState(null);
  const ref = useRef();
  useEffect(() => {
    setuid(fetchDetails().id);
    setpid(post.u.id);
    let date = new Date(post.date);
    let ndate = new Date();
    let timediff = ndate.getTime() - date.getTime();
    let daydiff = Math.ceil(timediff / (1000 * 3600 * 24));
    ref.current = daydiff;
  }, [post]);

  return (
    <div className="container" align="left">
      <div
        className="card border-0 shadow-sm text"
        style={{ backgroundColor: "white" }}
      >
        <div className="card-body">
          {ref.current < 2 && (
            <span class="badge text-bg-danger ">New Post</span>
          )}

          <h1 className="card-title">{post.title.toUpperCase()} </h1>
          <div className="image">
            <img
              src={`${BASE_URL}/api/post/show/${post.imagename}`}
              className="card-img-top imgsh"
              alt="..."
            />
          </div>
          <p
            className="card-text "
            dangerouslySetInnerHTML={{
              __html:
                post.content.substring(0, post.content.length / 2).toString() +
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
