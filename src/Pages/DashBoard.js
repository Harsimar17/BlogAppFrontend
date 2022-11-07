import React, { useEffect, useState } from "react";
import { fetchDetails } from "../auth/Index";
import Base from "../components/Base";
import AddPost from "../routes/AddPost";
import { deletePost, getPostByUser } from "../services/Service";
import PostContent from "./PostContent";

export default function DashBoard() {
  const [pstsUser, setpstsUser] = useState([]);
  useEffect(() => {
    // console.log(fetchDetails().id);
    loadPost();
  }, [pstsUser]);

  const loadPost = () => {
    getPostByUser(fetchDetails().id).then((data) => {
      // console.log(data);
      setpstsUser([...data]);
    });
  };
  const delPost = (post) => {
    // console.log(pstsUser.id);
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
