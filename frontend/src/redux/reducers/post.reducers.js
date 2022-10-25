import {
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/post.actions";

const initialState = {
  loading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            content: action.payload.content,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            usersLiked: [action.payload.userId, ...post.usersLiked],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            usersLiked: post.usersLiked.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return post;
      });
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
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
        } else return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
