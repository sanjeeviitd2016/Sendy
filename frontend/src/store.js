import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {allUserReducer, loginReducer,postsReducer, userProfileReducer} from './reducers/user'
import { likeReducer, myPostReducer, userPostReducer } from './reducers/post';

const reducer= combineReducers({
    user: loginReducer,
    posts:postsReducer,
    allUsers: allUserReducer,
    like: likeReducer,
    myPosts: myPostReducer,
    userPosts: userPostReducer,
    userProfile: userProfileReducer
});

const middleware = [thunk];
const initialState={}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;