import React from "react";
import { useRef } from "react";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchDetails, isLogin } from "../auth/Index";
import {
  faHeart,
  faHeartBroken,
  faHeartCrack,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/Helper";
import Spinner from "./Spinner";
import { addLike, checkLike, getLikes } from "../services/Service";

export default function PostContent({ post, del }) {
  const [uid, setuid] = useState(null);
  const [pid, setpid] = useState(null);
  const [isliked, setisliked] = useState(false);
  const [all, setall] = useState(0);
  const ref = useRef();

  const getLL = () => {
    getLikes(post.id).then((res) => {
      console.log(res);
      setall(res);
    });
  };
  const isL = () => {
    isLogin() &&
      checkLike(post.id, fetchDetails().id).then((res) => {
        console.log(res);
        setisliked(res);
      });
  };
  useEffect(() => {
    setuid(fetchDetails().id);
    setpid(post.u.id);
    isL();
    getLL();
    let date = new Date(post.date);
    let ndate = new Date();
    let timediff = ndate.getTime() - date.getTime();
    let daydiff = Math.ceil(timediff / (1000 * 3600 * 24));
    ref.current = daydiff;
  }, [post.u.email]);
  const handleLike = () => {
    addLike(post.id, uid).then((res) => {
      console.log(res);
      getLL();
      isL();
    });
  };

  // const dislikef = () => {
  //   if (dislikeactive) {
  //     setdislikeactive(false);
  //     setdislike(dislike - 1);
  //   } else {
  //     setdislikeactive(true);
  //     setdislike(dislike + 1);
  //     if (likeactive) {
  //       setlikeactive(false);
  //       setdislike(dislike + 1);
  //       setlikes(likes - 1);
  //     }
  //     post &&
  //       lsave({ like: likes }, post.id).then((res) => {
  //         console.log(res);
  //       });
  //   }
  // };

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
              src={`${BASE_URL}/api/post/show/${post.imagename}/${
                !post.u.email ? <Spinner /> : post.u.email
              }`}
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
          <h4>
            <FontAwesomeIcon
              icon={isliked ? faHeart : faHeartBroken}
              className={`${!isLogin() ? "check" : ""}`}
              style={{ fontSize: "30px" }}
              onClick={handleLike}
            />
            <br />
            <span>{all} Likes</span>
          </h4>

          <Link to={"/post/" + post.id} className="btn btn-dark">
            Read full article....
          </Link>
          {isLogin() && uid && pid && uid === pid && (
            <FontAwesomeIcon
              icon={faTrash}
              className="ms-2 btn"
              style={{ fontSize: "30px" }}
              onClick={() => del(post)}
            />
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
