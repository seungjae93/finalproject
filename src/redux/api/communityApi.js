import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useCheckLogin from "../../hooks/useCheckLogin";
import { getCookie } from "../../shared/cookie";
import setToken from "../../shared/setToken";
import { instance } from "./instance";

// const { accessToken} = useCheckLogin

//get
export const getCommunity = async () => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get(
    `/posts?postLocation1=${""}&postLocation2=${""}`,
    { headers: headers }
  );
  return response.data;
};

//post
const addCommunity = async (formData) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.post("/posts", formData, {
    headers: headers,
  });
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
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get(`/posts/${postid}`, {
    headers: headers,
  });
  return response.data;
};

//delete
export const deleteCommunity = async (postid) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.delete(`/posts/${postid}`, {
    headers: headers,
  });
  return response.data;
};

//editget
export const getUpdateCommunity = async (postid) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get(`/posts/update/${postid}`, {
    headers: headers,
  });
  return response.data;
};

//edit
export const updateCommunity = async (postId, formData) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = {
    authorization: `Bearer ${accessToken}`,
    "content-type": "multipart/form-data",
  };
  const response = await instance.patch(`/posts/${postId}`, formData, {
    headers: headers,
  });
  return response.data;
};

//댓글 get
export const getComment = async (postid) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get(`/posts/${postid}/comments`, {
    headers: headers,
  });
  return response.data;
};

//댓글 post
const addComment = async (payload) => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.post(
    `/posts/${payload.postId}/comments`,
    {
      content: payload.text,
    },
    { headers: headers }
  );
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
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.delete(`/comments/${commentid}`, {
    headers: headers,
  });
  return response.data;
};

// 댓글 edit
export const updateComment = async (commentid, content) => {
  console.log(commentid);
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.put(`/comments/${commentid}`, {
    headers: headers,
    content: content,
  });
  return response.data;
};
