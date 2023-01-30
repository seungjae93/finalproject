import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "./instance";
import setToken from "../../shared/setToken";
import { getCookie } from "../../shared/cookie";
import { checkLogin } from "../../hooks/useCheckLogin";

const { accessToken, isLogin } = checkLogin();

// GET
export const getPosts = async () => {
  const response = await instance.get("/review");
  return response.data;
};

// POST
export const addPost = async (post) => {
  const response = await instance.post("/review", post);
  return response.data;
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    //후기를 작성하면 새로고침 없이 자동 리랜더링
    onSuccess: () => {
      queryClient.invalidateQueries("review");
    },
  });
};

// DELETE
export const deletePost = async (reviewId) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.delete(`/review/${reviewId}`, {
    headers: headers,
  });
  return response.data;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
    //후기를 작성하면 새로고침 없이 자동 리랜더링
    onSuccess: () => {
      queryClient.invalidateQueries("review");
    },
  });
};
