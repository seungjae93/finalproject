import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "./instance";

//get(지역별, 무한스크롤, 포스트순서, 검색)
export const getCommunity = async (pageParam, clickOrder, selected, search) => {
  const response = await instance.get(
    `/posts?postLocation1=${selected.postLocation1}&postLocation2=${selected.postLocation2}&page=${pageParam}&type=${clickOrder}&search=${search}`
  );
  const { posts, isLast } = response.data;
  return { posts, nextPage: pageParam + 1, isLast };
};

//post
const addCommunity = async (formData) => {
  const response = await instance.post("/posts", formData);
  return response.data;
};
export const useAddCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation(addCommunity, {
    onSuccess: () => {
      window.alert("등록 되었습니다.");
      queryClient.invalidateQueries("posts");
    },
  });
};

// postDetail
export const detailCommunity = async (postid) => {
  const response = await instance.get(`/posts/${postid}`);
  return response.data;
};

//delete
export const deleteCommunity = async (postid) => {
  const response = await instance.delete(`/posts/${postid}`);
  return response.data;
};

//editget
export const getUpdateCommunity = async (postid) => {
  const response = await instance.get(`/posts/update/${postid}`);
  return response.data;
};

//edit
export const updateCommunity = async (postId, formData) => {
  const response = await instance.patch(`/posts/${postId}`, formData);
  return response.data;
};

//댓글 get
export const getComment = async (postid) => {
  const response = await instance.get(`/posts/${postid}/comments`);
  return response.data;
};

//댓글 post
const addComment = async (payload) => {
  const response = await instance.post(`/posts/${payload.postId}/comments`, {
    content: payload.text,
  });
  return response.data;
};
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
};

//댓글 delete
export const deleteComment = async (commentid) => {
  const response = await instance.delete(`/comments/${commentid}`);
  return response.data;
};

// 댓글 edit
export const updateComment = async (commentid, content) => {
  const response = await instance.put(`/comments/${commentid}`, {
    content: content,
  });
  return response.data;
};
