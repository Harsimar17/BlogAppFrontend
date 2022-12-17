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
export const imageHandle = (image, pid, uname) => {
  let formData = new FormData();
  formData.append("image", image);
  return paxios
    .post(`/api/post/store/${pid}/${uname}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};
export const profileImage = (image, uid, uname) => {
  let formData = new FormData();
  console.log();
  formData.append("image", image);
  formData.set("Accept", "application/json");
  console.log(image);
  return paxios
    .put(`/profile/image/${uid}/${uname}`, formData, {
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
export const emailService = (email) => {
  return myaxios.post(`/forgot/${email}`).then((resp) => resp.data);
};
export const otpVerify = (otp) => {
  return myaxios.post(`/checkOTP/${otp}`).then((resp) => resp.status);
};

export const passUpdate = (uname, pass) => {
  return myaxios.put(`/userPass/${uname}`, pass).then((resp) => resp.data);
};

export const addLike = (pid, uid) => {
  return paxios.put(`/like/${uid}/${pid}`).then((res) => res.data);
};
export const getLikes = (pid) => {
  return paxios.get(`/like/${pid}`).then((res) => res.data);
};
export const checkLike = (pid, uid) => {
  return paxios.get(`/like/check/${pid}/${uid}`).then((res) => res.data);
};
