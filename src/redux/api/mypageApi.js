import axios from "axios";
import { getCookie } from "../../shared/cookie";
import setToken from "../../shared/setToken";
import { instance } from "./instance";

export const getmypageReviews = async () => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };

  const response = await instance.get("/review/myReview", {
    headers: headers,
  });
  return response.data;
};

export const getmypagePosts = async () => {
  const response = await instance.get("/posts/me");
  return response.data;
};
