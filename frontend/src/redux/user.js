// This file contains Slice, Reducers and Actions for ReduxToolkit

// import { createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";
// import cookie from "js-cookie";
// const removeCookie = (key) => {
//   if (window !== "undefined") {
//     cookie.remove(key, { expires: 1 });
//   }
// };

// export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
// export const UPDATE_BIO = "UPDATE_BIO";

// export default userSlice.reducer;
// export const { userInfo, clearUser, uploadReducer, userBio } = userSlice.actions;

// Actions //

// Upload Picture

// export const uploadPicture = (data, id) => {
//   return (dispatch) => {
//     return axios
//       .post(`${process.env.REACT_APP_API_URL}`, data)
//       .then((res) => {
//         return axios
//           .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
//           .then((res) => {
//             dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
//           });
//       })
//       .catch((err) => console.error(err));
//   };
// };

// export const uploadPicture = (data, id) => {
//   return async (dispatch) => {
//     axios.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data);
//     try {
//       await axios
//         .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
//         .then((res) => {
//            console.log(res.data.picture)
//           return dispatch(uploadReducer(res.data.picture));
//         })
//         .catch((err) => console.error(err));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };


