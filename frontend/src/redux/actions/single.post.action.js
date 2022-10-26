import axios from "axios";

export const GET_SINGLE_POST = "GET_SINGLE_POST";
export const UPDATE_SINGLE_POST = "UPDATE_SINGLE_POST";
export const getSinglePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_SINGLE_POST, payload: res.data });
      })
      .catch((err) => console.log(err.message));
  };
};
export const updateSinglePost = (postId, content) => {
   return (dispatch) => {
     return axios({
       method: "put",
       url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
       data: { content },
       withCredentials: true,
     })
       .then((res) => {
         dispatch({ type: UPDATE_SINGLE_POST, payload: { content, postId } });
       })
       .catch((err) => console.log(err));
   };
 };
