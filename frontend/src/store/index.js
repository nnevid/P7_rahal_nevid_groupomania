import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from './user'
// import userReducer from './user'


const reducer = combineReducers({
  user,
})
const store = configureStore({
  reducer,
//   reducer: {
//    user: userReducer,
//   }
})
export  {reducer}
export default store;



