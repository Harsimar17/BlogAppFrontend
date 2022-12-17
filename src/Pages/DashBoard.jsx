import React, { useEffect, useState } from "react";
import { fetchDetails } from "../auth/Index";
import Base from "../cmpnts/Base";
import AddPost from "../cmpnts/AddPost";
import { deletePost, getPostByUser } from "../services/Service";
import PostContent from "../cmpnts/PostContent";

export default function DashBoard() {
  const [pstsUser, setpstsUser] = useState([]);
  useEffect(() => {
    loadPost();
  }, [pstsUser]);

  const loadPost = () => {
    getPostByUser(fetchDetails().id).then((data) => {
      setpstsUser([...data]);
    });
  };
  const delPost = (post) => {
    deletePost(post.id).then((resp) => {
      loadPost();
    });
  };
  return (
    <Base>
      <div className="container">
        <AddPost />
        <br />

        {pstsUser.map((data, index) => {
          return (
            <div>
              <br />
              <PostContent post={data} cont={pstsUser[index]} del={delPost} />
              <br />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
