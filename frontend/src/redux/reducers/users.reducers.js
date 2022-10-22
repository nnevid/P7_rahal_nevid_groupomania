import { GET_USERS } from "../actions/users.actions";

const initialState = {
   users:[],
   isLoading: false,
};
export default function usersReducer(state = initialState, action) {
   switch (action.type) {
     case GET_USERS:
       return {users: action.payload}
     default:
       return state;
   }
 }