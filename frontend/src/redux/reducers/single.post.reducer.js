import { GET_SINGLE_POST } from "../actions/single.post.action";

const initialState = {
   post: {},
   loading: true,
 };


 export default function singlePostReducer(state = initialState, action) {
   
   switch (action.type) {
      case GET_SINGLE_POST:
      return {
         post: action.payload,
         loading: false
      };
      
       
      default:
      return state;
 }
}