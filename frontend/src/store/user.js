import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Slice
const slice = createSlice({
  name: "user",
  initialState: {},
  reducers:{
   userInfo: (state, action) =>{
      state.user = action.payload;
   },
  }
});

// Actions
const {userInfo} = slice.actions

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch(userInfo({ payload: res.data}));
      })
      .catch((err) => console.log(err))
  };
};

// export const pseudo = (uid) => async dispatch =>{
//    try{
//       await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
//       dispatch(userPseudo({pseudo}));
//    }
//    catch (err) {
//       return console.error(err.message);
//    }
// }

export default slice.reducer;



