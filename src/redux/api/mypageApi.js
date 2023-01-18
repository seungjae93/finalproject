import axios from "axios";

export const getmypageReviews = async (myreview) => {
  const response = await axios.get(
    `https://spart-instagram.shop/review/items/${myreview.reviewId}`
  );
  return response.data;
};

export const getmypagePosts = async () => {
  const response = await axios.get("https://goldpumpkin.shop/posts/me");
  return response.data;
};
