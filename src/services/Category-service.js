import { myaxios } from "./Helper";
export const cAt = () => {
  return myaxios.get("/category/").then((response) => {
    return response.data;
  });
};
