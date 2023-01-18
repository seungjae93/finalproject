import axios from "axios";
import { getCookie } from "../../shared/cookie";
import setToken from "../../shared/setToken";
import { instance } from "./instance";

export const getmypageReviews = async () => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };

  const response = await axios.get(
    "https://spart-instagram.shop/review/myReview",
    {
      headers: headers,
    }
  );
  return response.data;
};

export const getmypagePosts = async () => {
  const response = await axios.get("https://goldpumpkin.shop/posts/me");
  return response.data;
};
