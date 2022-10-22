import { GET_ALL_POSTS } from "../actions/post.actions";

const initialState = {
   posts:[],
   isLoading: false
}

export default function allPostsReducer(state = initialState, action) {
   switch (action.type) {
     case GET_ALL_POSTS:
       return {posts: action.payload}
     default: 
       return state;
   }
 }