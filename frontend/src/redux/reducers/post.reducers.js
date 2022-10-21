import { GET_POSTS, GET_ALL_POSTS } from "../actions/posts.actions";

const initialState = {
  loading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case GET_ALL_POSTS:
      return action.payload;  
    default:
      return state;
  }
}
