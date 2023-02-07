import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "./instance";

export const getPosts = async () => {
  const response = await instance.get("/review");
  return response.data;
};

export const addPost = async (post) => {
  const response = await instance.post("/review", post);
  return response.data;
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("review");
    },
  });
};

export const deletePost = async (reviewId) => {
  const response = await instance.delete(`/review/${reviewId}`);
  return response.data;
};

// ------------------------------------------------

export const getmypageReviews = async () => {
  const response = await instance.get("/review/myReview");
  const { data } = response.data;
  return data;
};

export const getmypagePosts = async () => {
  const response = await instance.get("/posts/me");
  return response.data;
};
