import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "./features/authSlice"
// import { combineReducers } from 'redux'
// import user from './user'

// const reducer = combineReducers({
//      user,
// })
const store = configureStore({
  reducer: {
   userInfo: UserReducer,
  }
})

export default store;



