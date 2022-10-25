import {
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {
   isLoading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case UPLOAD_PICTURE:
      console.log(action.payload);
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
       console.log(action.payload)
      return {
         
        ...state,
         bio: action.payload,
      };

    default:
      return state;
  }
}
