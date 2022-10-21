import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";


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