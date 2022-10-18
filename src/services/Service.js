import { myaxios } from "./Helper";
export const Spring = (user) => {
  return myaxios.post("/newUser", user).then((response) => response.data);
};
export const loginU = (user) => {
  return myaxios.post("/login", user).then((resp) => resp.data);
};
