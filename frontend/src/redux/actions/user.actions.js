import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

//  REDUX ACTIONS
export const getUser = (uid) => {
   return (dispatch) => {
     return axios
       .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
       .then((res) => {
         dispatch({ type: GET_USER, payload: res.data });
       })
       .catch((err) => console.log(err));
   };
 };
 export const getUsers = () => {
   return (dispatch) => {
     return axios
       .get(`${process.env.REACT_APP_API_URL}api/user`)
       .then((res) => {
         dispatch({ type: GET_ALL_USERS, payload: res.data });
       })
       .catch((err) => console.log(err));
   };
 };

 export const uploadPicture = (data, id) => {
   return (dispatch) => {
     return axios
       .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
       .then((res) => {
         if (res.data.errors) {
           dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
         } else {
           dispatch({ type: GET_USER_ERRORS, payload: "" });
           return axios
             .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
             .then((res) => {
               dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
             });
         }
       })
       .catch((err) => console.log(err.message));
   };
 };

 export const updateBio = (userId, bio) => {
   return (dispatch) => {
     return axios({
       method: "put",
       url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
       data: { bio },
     })
       .then((res) => {
         dispatch({ type: UPDATE_BIO, payload: bio });
       })
       .catch((err) => console.log(err));
   };
 };