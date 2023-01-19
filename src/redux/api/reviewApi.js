import { useMutation } from "@tanstack/react-query";
import { instance } from "./instance";
import setToken from "../../shared/setToken";
import { getCookie } from "../../shared/cookie";

// POST
export const addPost = async (post) => {
  try {
    const accessToken = getCookie("token");
    setToken(accessToken);
    const headers = { authorization: `Bearer ${accessToken}` };
    const response = await instance.post("/review", post, {
      headers: headers,
    });

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
  const response = await instance.get("/review");
  return response.data;
};
