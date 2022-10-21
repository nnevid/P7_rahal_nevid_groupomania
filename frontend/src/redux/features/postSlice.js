import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk('posts/getposts', async () => {
   try {
      const res = await axios({
         method: "get",
         url: `${process.env.REACT_APP_API_URL}api/post`,
         withCredentials: true,
      });
      return res.data;
   } catch (err) {
      return console.log(err);
   }
})


const postsSlice = createSlice({
  name: "posts",
  initialState: {
   posts: [],
   loading: false,
   error:"",
  },
  extraReducers: {
   [getPosts.pending]: (state, action) => {
     state.loading = true;
   },
   [getPosts.fulfilled]: (state, action) => {
   //   console.log(action.payload);
     state.loading = false;
     state.posts = action.payload;
   },
   [getPosts.rejected]: (state, action) => {
     state.loading = false;
     state.posts = action.payload.message;
   },
 },
 });
 



export default postsSlice.reducer;

// extrareducers: {
//    [getPosts.pending]: (state, action) => {
//      state.loading = true;
//    },
//    [getPosts.fulfilled]: (state, action) => {
//      console.log(action.payload);
//      state.loading = false;
//      state.posts = action.payload;
//    },
//    [getPosts.rejected]: (state, action) => {
//      state.loading = false;
//      state.posts = action.payload.message;
//    },
//  },
