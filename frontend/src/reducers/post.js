import {
  CLEAR_MESSAGE,
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
  USER_POST_SUCCESS,
  USER_POST_FAIL,
  USER_POST_REQUEST,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
} from "../constants/post";
import {
  CLEAR_ERRORS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_RQUEST,
  USER_FOLLOW_SUCCESS,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_REQUEST,
} from "../constants/user";

export const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case ADD_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST:
    case CAPTION_UPDATE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case NEW_POST_REQUEST:
    case USER_FOLLOW_RQUEST:
    case DELETE_POST_REQUEST:
    case DELETE_PROFILE_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };
    case ADD_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS:
    case CAPTION_UPDATE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case NEW_POST_SUCCESS:
    case USER_FOLLOW_SUCCESS:
    case DELETE_POST_SUCCESS:
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };

    case LIKE_FAIL:
      return {
        ...state,
        loading: false,
        success: true,
        error: action.payload,
      };
    case ADD_COMMENT_FAIL:
    case DELETE_COMMENT_FAIL:
    case CAPTION_UPDATE_FAIL:
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
    case NEW_POST_FAIL:
    case USER_FOLLOW_FAIL:
    case DELETE_POST_FAIL:
    case DELETE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
  }
};

export const myPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MY_POSTS_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case MY_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        myPosts: action.payload,
      };
    case MY_POSTS_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  }
};

export const userPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case USER_POST_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        posts: action.payload,
      };
    case USER_POST_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  }
};
