import {
  GET_SINGLE_POST,
  UPDATE_SINGLE_POST,
} from "../actions/single.post.action";
import {
  LIKE_POST,
  UNLIKE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/post.actions";

const initialState = {
  //   post: {},
  loading: true,
};

export default function singlePostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_POST:
      return action.payload;
    //   loading: false,
    case UPDATE_SINGLE_POST:
      return {
        ...state,
        content: action.payload.content,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.payload.commentId) {
            return {
              ...comment,
              text: action.payload.text,
            };
          } else {
            return comment;
          }
        }),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        ),
      };
    case LIKE_POST:
      return {
        ...state,
        usersLiked: [action.payload.userId, ...state.usersLiked],
      };
    case UNLIKE_POST:
      return{
         ...state,
         usersLiked: state.usersLiked.filter((id) => id !== action.payload.userId)
      }  
    default:
      return state;
  }
}
