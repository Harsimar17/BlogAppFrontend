import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isLogin } from "../auth/Index";
import { BASE_URL, cPost } from "../services/Helper";
import { onePost } from "../services/Service";
import { toast } from "react-toastify";
import Base from "./Base";
import { useRef } from "react";

function UserPost() {
  const { id } = useParams();
  const [udata, setudata] = useState(null);
  const [cmnt, setcmnt] = useState({
    comment: "",
  });
  let ref = useRef();
  useEffect(() => {
    onePost(id).then((resp) => {
      setudata(resp);
      let date = new Date(udata.date);
      let ndate = new Date();
      let timediff = ndate.getTime() - date.getTime();
      let daydiff = Math.ceil(timediff / (1000 * 3600 * 24));
      ref.current = daydiff;
    });
  }, [udata, id]);

  const printDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const addComment = () => {
    if (isLogin()) {
      cPost(cmnt, udata.u.id, udata.id).then((data) => {});
    } else {
      toast.error("Sign in required!!");
      return;
    }
  };
  return (
    udata && (
      <Base>
        <div
          className="card container form-control shadow-sm"
          style={{ width: "60%" }}
          align="left"
        >
          <br />
          <h1 className="card-title">
            <b className="text-dark">
              {udata.title.charAt(0).toUpperCase() + udata.title.substring(1)}
            </b>
          </h1>
          <br />
          <span className="square border border-dark">
            <img
              src={`${BASE_URL}/api/post/show/${udata.imagename}/${udata.u.email}`}
              className="card-img-top data"
              alt="..."
              style={{ height: "800px" }}
            />
          </span>
          <div className="card-body">
            <h1
              className="card-text "
              dangerouslySetInnerHTML={{
                __html:
                  udata.content[0].toUpperCase() + udata.content.substring(1),
              }}
            ></h1>
            <br />
            <p className="card-title" align="right">
              Posted by{" "}
              <b className="text-dark">
                {udata.u.name.toUpperCase()} on {printDate(udata.date)}
              </b>
              <br />{" "}
              <p>
                at{" "}
                <b className="text-dark">
                  {new Date(udata.date).toLocaleTimeString()}
                </b>
                <br />
                <button className="btn btn-success " onClick={window.print}>
                  Print
                </button>
              </p>
            </p>
          </div>
          <br />
          <div>
            <h4>
              <b>
                Comments (
                {udata.li.length ? udata.li.length : "No comments yet!!"})
              </b>
            </h4>
            <ul>
              <i className="">
                {udata.li.length
                  ? udata.li.map((c) => (
                      <p>
                        <li>
                          <i>{c.comment}</i>
                        </li>
                      </p>
                    ))
                  : "No comments !!"}
              </i>
            </ul>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              <h4>
                <b>Add Comment</b>
              </h4>
            </label>
            <textarea
              placeholder="Start typing . . ."
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setcmnt({ comment: e.target.value })}
            />
            <br />
            <button
              className={`btn btn-dark ${
                cmnt.comment === "" ? "disabled" : cmnt.comment
              } `}
              onClick={addComment}
            >
              Submit
            </button>
          </div>
        </div>
      </Base>
    )
  );
}

export default UserPost;
