import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "./instance";

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
  const response = await instance.delete(`/review/${reviewId}`);
  return response.data;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("review");
    },
  });
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
