import axios from "axios";
import { useMutation } from "react-query";

const reviewApi = axios.create({
  baseURL: "https://spart-instagram.shop",
});

// POST
export const addPost = async (post) => {
  try {
    const response = await axios.post("/review", post);

    if (response.status === 200) return response.data;
    else if (response.status === 401) {
      alert("로그인 먼저 해주세요");
    } else if (response.status === 405) {
      alert("형식이 올바르지 않습니다");
    }
  } catch (error) {
    console.log("error");
  }
};

export const useAddPost = () => {
  return useMutation(addPost);
};

//GET
export const getPosts = async () => {
  const response = await axios.get("/review");
  return response.data;
};
