import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  POST_FOLLOWING_FAIL,
  POST_FOLLOWING_REQUEST,
  POST_FOLLOWING_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  LOGOUT_REQUREST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_RQUEST,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
} from "../constants/user";

import axios from "axios";
import { Try } from "@mui/icons-material";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/login`, { email, password }, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.post(
      "/register",
      { name, email, password, avatar },
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/me");

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.me });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_FOLLOWING_REQUEST });

    const { data } = await axios.get("/posts");
    dispatch({ type: POST_FOLLOWING_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({
      type: POST_FOLLOWING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_USER_REQUEST });

      const { data } = await axios.get(`/users/?name=${name}`);

      dispatch({ type: ALL_USER_SUCCESS, payload: data.Users });
    } catch (error) {
      dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUREST });
    const { data } = await axios.get("/logout");

    dispatch({ type: LOGOUT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/update/profile",
      { name, email, avatar },
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/update/password",
        { oldPassword, newPassword, confirmPassword },
        config
      );
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/forgot/password", { email }, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword =
  (token, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      console.log("err");
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/reset/password/${token}`,
        { newPassword, confirmPassword },
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      console.log("err", error);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const userProfile = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const { data } = await axios.get(`/user/profile/${userId}`);

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.response.data.message });
  }
};

export const doUserFollow = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_FOLLOW_RQUEST });

    const { data } = await axios.get(`/follow/user/${userId}`);
    dispatch({ type: USER_FOLLOW_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: USER_FOLLOW_FAIL, type: error.response.data.message });
  }
};

export const deleteMyAccount = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROFILE_REQUEST });

    const { data } = await axios.delete("/me/delete");
    dispatch({ type: DELETE_PROFILE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_PROFILE_FAIL, type: error.response.data.message });
  }
};


