import { combineReducers } from "redux";
import userData from "./user.reducers";
import allUsersData from "./users.reducers";
import postData from "./post.reducers";
import allPostsData from "./allPosts.reducer";
import errorData from "./error.reducer";
import singlePost from "./single.post.reducer";

export default combineReducers({
  userData,
  allUsersData,
  postData,
  allPostsData,
  errorData,
  singlePost,
});
