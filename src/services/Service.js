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
  return paxios.post(`/api/post/store/${pid}`, formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  }).then((resp) => resp.data);
};
