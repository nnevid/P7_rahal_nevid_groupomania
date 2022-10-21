import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "./features/authSlice"
import PostReducer from "./features/postSlice"
// import { combineReducers } from 'redux'
// import user from './user'

// const reducer = combineReducers({
//      user,
// })

export default configureStore({
   reducer: {
    userInfo: UserReducer,
    Posts: PostReducer,
   }, 
   
 })



