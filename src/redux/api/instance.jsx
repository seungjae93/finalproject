import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_POST_SERVER,
  withCredentials: true,
  //엑시오스 csrf 구글링
});
