import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";
const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, { expires: 1 });
  }
};

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
// Slice

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    userInfo: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state, action) => {
      state.user = {};
      localStorage.removeItem("user");
    },
    uploadReducer: (state, action) => {
      switch (action.type) {
        case UPLOAD_PICTURE:
          return {
            ...state,
            picture: action.payload,
          };
        default:
          return state;
      }
    },
  },
});

// export function uploadReducer(state, action) {
//   switch (action.type) {
//     case UPLOAD_PICTURE:
//       return {
//         ...state,
//         picture: action.payload,
//       };
//     default:
//       return state;
//   }
// }
export default userSlice.reducer;
export const { userInfo, clearUser, uploadReducer } = userSlice.actions;

// Actions //

// Get user Data

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch(userInfo(res.data));
      })
      .catch((err) => console.log(err));
  };
};

// Logout

export const logout = async (dispatch) => {
  await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}api/user/logout`,
    withCredentials: true,
  })
    .then(() => {
      removeCookie("jwt");
      return dispatch(clearUser());
    })
    .catch((err) => console.log(err));
  window.location = "/profil";
};

// Upload Picture
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const uploadPicture = (data, id) => {
   
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      
      .then((res) => {
         
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
         
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};
