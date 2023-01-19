import { getCookie } from "../../shared/cookie";
import { instance } from "./instance";
import setToken from "../../shared/setToken";

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
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get("/posts/me", {
    headers: headers,
  });
  return response.data;
};
