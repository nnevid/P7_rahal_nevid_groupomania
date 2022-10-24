import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";


export const getPosts = (num) => {
   return (dispatch) => {
     return axios({
         method:"get",
         url:`${process.env.REACT_APP_API_URL}api/post/`,
         withCredentials: true,
      })
       .then((res) => {
         const array = res.data.slice(0, num);
         dispatch({ type: GET_POSTS, payload: array });
         dispatch({ type: GET_ALL_POSTS, payload: res.data });
       })
       .catch((err) => console.log(err));
   };
 };

 export const updatePost = (postId, content) => {
   return (dispatch) => {
     return axios({
       method: "put",
       url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
       data: { content },
       withCredentials: true,
       
     })
       .then((res) => {
         dispatch({ type: UPDATE_POST, payload: { content, postId } });
       })
       .catch((err) => console.log(err));
   };
 };

 export const likePost = (postId, userId, like) => {
   return (dispatch) => {
     return axios({
       method: "post",
       url: `${process.env.REACT_APP_API_URL}api/post/like/${postId}` ,
       withCredentials: true,
       data: {
         userId,
         like
       }
     })
       .then((res) => {
         dispatch({ type: LIKE_POST, payload: { postId, userId } });
       })
       .catch((err) => console.log(err.message));
   };
 };
 export const unlikePost = (postId, userId) => {
   return (dispatch) => {
     return axios({
       method: "post",
       url: `${process.env.REACT_APP_API_URL}api/post/unlike/${postId}` ,
       withCredentials: true,
       data: {
         userId
         
       }
     })
       .then((res) => {
         dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
       })
       .catch((err) => console.log(err.message));
   };
 };