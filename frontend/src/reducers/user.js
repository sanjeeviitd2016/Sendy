import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  POST_FOLLOWING_FAIL,
  POST_FOLLOWING_REQUEST,
  POST_FOLLOWING_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  LOGOUT_REQUREST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST
} from "../constants/user";

export const loginReducer = ( state={user:{}}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
          case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenicated: false,
        success:false
      };
      case LOGOUT_REQUREST:
        return{
          loading:true,
          success:false
        }
      
    case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success:true,
        user: action.payload,        
        isAuthenicated: true,
        
      };

      case LOGOUT_SUCCESS:
        return{
          ...state,
          loading: false,
          isAuthenicated:false,
          message: action.payload,
          user:null
        }
     
    case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenicated: false,
        user: null,
        error: action.payload,
        success:false
      };
    case LOGOUT_FAIL:
      return{
        loading: false,
        error: action.payload,
        isAuthenicated: true

      }
    case LOAD_USER_FAIL:
      return{
        loading: false,
        isAuthenicated: false,
        user: null,
        error: action.payload,
      }
    
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
        return{
            ...state
        }
  }
};

export const postsReducer =(state={posts:[]},action) =>{

    switch (action.type){

      case POST_FOLLOWING_REQUEST:
        return{
            success:false,
            loading:true
        }

      case POST_FOLLOWING_SUCCESS:
        return{
          ...state,
          loading:false,
          success:true,
          posts: action.payload
        }
      case POST_FOLLOWING_FAIL:
        return{
          loading: false,
          success: false,
          error: action.payload
        }
      case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
      default :
      return{
          ...state
      }
    }
}

export const allUserReducer= (state={users:[]}, action)=>{

  switch (action.type){
     case ALL_USER_REQUEST:
       return{
         loading: true,
         success:false
       }

      case ALL_USER_SUCCESS:
        return{
          ...state,
          loading:false,
          success:true,
          users:action.payload
        }
      case ALL_USER_FAIL:
        return{
          loading: false,
          success: false,
          error: action.payload
        }
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return{
            ...state
          }
  }
}


export const userProfileReducer= (state={user:{}}, action)=>{

  switch (action.type){
     case USER_PROFILE_REQUEST:
       return{
         loading: true,
         success:false
       }

      case USER_PROFILE_SUCCESS:
        return{
          ...state,
          loading:false,
          success:true,
          user:action.payload
        }
      case USER_PROFILE_FAIL:
        return{
          loading: false,
          success: false,
          error: action.payload
        }
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return{
            ...state
          }
  }
}



