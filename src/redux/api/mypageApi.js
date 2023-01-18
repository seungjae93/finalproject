import axios from "axios";
import setToken from "../../shared/setToken";
import { getCookie } from "../../shared/cookie";
import { instance } from "./instance";

export const getmypageReviews = async (myreview) => {
  const response = await axios.get(
    `https://spart-instagram.shop/review/items/${myreview.reviewId}`
  );
  return response.data;
};

export const getmypagePosts = async () => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get("/posts/me", { headers: headers });
  return response.data;
};
