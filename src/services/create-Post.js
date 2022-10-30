import { paxios as myaxios } from "./Helper";
export const createPost = (data) => {
  return myaxios
    .post(`/api/user/${data.uid}/category/${data.categoryid}`, data)
    .then((resp) => resp.data);
};
