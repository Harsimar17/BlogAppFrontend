import axios from "axios";
// import axios from "axios";
export const BASE_URL = "http://localhost:8080/jwt";
export const myaxios = axios.create({
  baseURL: BASE_URL,
});
