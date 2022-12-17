import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Base from "./Base";
import { allPost, deletePost } from "../services/Service";
import PostContent from "./PostContent";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Pages/Spinner";
import { useContext } from "react";
import cont from "../Context/Context";
export default function AllPost() {
  const [srch, setsrch] = useState("");
  const [posts, setposts] = useState({
    content: [],
    totalelement: "",
    lpage: false,
    pnumber: "",
  });

  const [cpage, setcpage] = useState(0);
  const context = useContext(cont);
  useEffect(() => {
    withPagin(cpage);
  }, [cpage]);
  useEffect(() => {
    setsrch(context.helper.name);
  }, [context.helper.name]);

  const withPagin = (pageNumber = 0, pageSize = 5) => {
    allPost(pageNumber, pageSize).then((resp) => {
      setposts({
        content: [...posts.content, ...resp.content],
        totalelement: resp.totalelements,
        lpage: resp.lastpage,
        pnumber: resp.pagenumber,
      });
    });
  };
  const delPost = (post) => {
    deletePost(post.id).then((resp) => {
      let newPost = posts.content.filter((p) => p.id !== post.id);
      setposts({ ...posts, content: newPost });
    });
  };
  const fetchmoreDetails = () => {
    setcpage(cpage + 1);
  };

  return (
    <Base>
      <div className="container">
        <h1 align="left" style={{ marginLeft: "13px" }}>
          <span className="badge text-bg-dark">
            {posts.totalelement} NEW POSTS
          </span>
        </h1>
        <InfiniteScroll
          hasMore={!posts.lpage}
          next={fetchmoreDetails}
          dataLength={posts.content.length}
          loader={<Spinner />}
        >
          {posts.content
            .filter((val) =>
              val.title.toLowerCase().includes(srch.toLowerCase())
            )
            .map((post) => (
              <div>
                <PostContent post={post} del={delPost} />
                <br />
              </div>
            ))}
        </InfiniteScroll>

        {/* <nav aria-label="Page navigation example">
          <ul className="pagination  justify-content-center">
            <li className="page-item">
              <Link
                className={`page-link border-light ${
                  posts.pagenumber === 0 ? "disabled" : "text-dark"
                }`}
                onClick={() => withPagin(posts.pagenumber - 1, posts.pagesize)}
              >
                Previous
              </Link>
            </li>
            {[...Array(posts.totalpage)].map((item, index) => (
              <li
                className={`page-item   ${
                  index === posts.pagenumber ? "active" : ""
                }`}
                onClick={() => withPagin(index, posts.pagesize)}
                aria-current="page"
                key={index}
              >
                <span
                  style={{ color: "black" }}
                  className={`page-link border-light  ${
                    index === posts.pagenumber ? "bg-dark text-light" : ""
                  }`}
                >
                  {index + 1}
                </span>
              </li>
            ))}
            <li className="page-item ">
              <Link
                className={`page-link border-light ${
                  posts.lastpage ? "disabled" : ""
                }`}
                onClick={() => withPagin(posts.pagenumber + 1, posts.pagesize)}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </Base>
  );
}
