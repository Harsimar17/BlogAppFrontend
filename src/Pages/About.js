import React, { useEffect, useState } from "react";
import { fetchDetails } from "../auth/Index";
import Base from "../components/Base";
import { deletePost, getPostByUser } from "../services/Service";
import PostContent from "./PostContent";

export default function About() {
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
      <div>
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
