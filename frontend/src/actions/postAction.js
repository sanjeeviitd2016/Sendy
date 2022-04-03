import axios from "axios";
import {
  LIKE_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  CAPTION_UPDATE_FAIL,
  CAPTION_UPDATE_REQUEST,
  CAPTION_UPDATE_SUCCESS,
  MY_POSTS_FAIL,
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  NEW_POST_FAIL,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  USER_POST_FAIL,
  USER_POST_SUCCESS,
  USER_POST_REQUEST,
  DELETE_POST_REQUEST,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
} from "../constants/post";
import { USER_FOLLOW_FAIL } from "../constants/user";

export const getLikeUsers = (postId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_REQUEST });

    const { data } = await axios.get(`post/like/${postId}`);

    dispatch({ type: LIKE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: LIKE_FAIL, payload: error.response.data.message });
  }
};

export const addCommentOnPost = (comment, postId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });
    const { data } = await axios.post(
      `/post/comment/${postId}`,
      {
        Comment: comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: ADD_COMMENT_FAIL, payload: error.response.data.message });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/post/comment/delete/${postId}`,
      { commentId },
      config
    );
    console.log("daya", data);
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCaption = (caption, id) => async (dispatch) => {
  try {
    dispatch({ type: CAPTION_UPDATE_REQUEST });
    console.log("c", caption);
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/post/caption/${id}`,
      { caption },
      config
    );

    dispatch({ type: CAPTION_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CAPTION_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: MY_POSTS_REQUEST });

    const { data } = await axios.get("/my/posts");

    dispatch({ type: MY_POSTS_SUCCESS, payload: data.Posts });
  } catch (error) {
    dispatch({ type: MY_POSTS_FAIL, payload: error.response.data.message });
  }
};

export const newPost = (caption, images) => async (dispatch) => {
  try {
    dispatch({ type: NEW_POST_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/post/upload",
      { caption, images },
      config
    );

    dispatch({ type: NEW_POST_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: NEW_POST_FAIL, payload: error.response.data.message });
  }
};

export const getUsePosts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_POST_REQUEST });

    const { data } = await axios.get(`/user/posts/${userId}`);

    dispatch({ type: USER_POST_SUCCESS, payload: data.Posts });
  } catch (error) {
    dispatch({ type: USER_POST_FAIL, payload: error.response.data.message });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const { data } = await axios.delete(`/post/delete/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_POST_FAIL, payload: error.response.data.message });
  }
};
