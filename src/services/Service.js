import { myaxios, paxios } from "./Helper";
export const Spring = (user) => {
  return myaxios.post("/jwt/newUser", user).then((response) => response.data);
};
export const loginU = (user) => {
  return myaxios.post("/jwt/login", user).then((resp) => resp.data);
};
export const allPost = (pageNumber = 0, ps = 5) => {
  return myaxios
    .get(`/api/all?pagenumber=${pageNumber}&pagesize=${ps}`)
    .then((resp) => resp.data);
};

export const onePost = (pid) => {
  return myaxios.get(`/api/post/${pid}`).then((resp) => resp.data);
};
export const imageHandle = (image, pid) => {
  let formData = new FormData();
  formData.append("image", image);
  return paxios
    .post(`/api/post/store/${pid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};
export const profileImage = (image, uid) => {
  let formData = new FormData();
  console.log();
  formData.append("image", image);
  formData.set("Accept", "application/json");
  console.log(image);
  return paxios
    .put(`/profile/image/${uid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
    .then((resp) => resp.data);
};
export const getPostByUser = (id) => {
  return myaxios.get(`/api/user/${id}/posts`).then((resp) => resp.data);
};
export const deletePost = (postid) => {
  return paxios.delete(`/api/post/${postid}`).then((resp) => {
    console.log(resp.data);
  });
};
export const updatePost = (postdata, pid) => {
  console.log(postdata);
  return paxios.put(`/api/updatePost/${pid}`, postdata).then((res) => res.data);
};

export const deleteAccount = (uid) => {
  return paxios.delete(`/${uid}`).then((resp) => resp.data);
};
