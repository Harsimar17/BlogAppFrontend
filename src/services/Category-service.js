import { myaxios } from "./Helper";
export const cAt = () => {
  return myaxios.get("/category/").then((response) => {
    return response.data;
  });
};
export const postByctgryId = (cid) => {
  return myaxios.get(`/api/category/${cid}/posts`).then((resp) => {
    return resp.data;
  });
};
