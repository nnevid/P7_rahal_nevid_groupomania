import axios from "axios";

export const GET_SINGLE_POST = "GET_SINGLE_POST";
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
