import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//Actions
export const userInfo = createAsyncThunk("auth/login", async (uid) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}api/user/${uid}`
    );
    // toast.success("Connexion réussie 💻", {position: toast.POSITION.TOP_RIGHT}); à voir plus tard...

    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const usersInfo = createAsyncThunk("allusers/data", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}api/user/`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const logout = createAsyncThunk("auth/logout", async (dispatch) => {
  await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}api/user/logout`,
    withCredentials: true,
  })
    .then((res) => {
      dispatch(clearUser());
    })
    .catch((err) => console.log(err.message));
  window.location = "/profil";
});

export const uploadPicture = createAsyncThunk(
  "UPLOAD_PICTURE",
  async (data, thunk) => {
    try {
        await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/upload`,
        data: data,
        withCredentials: true,
      })
      .then(()=>{
         thunk.dispatch(userInfo())
      const state = thunk.getState();
      console.log(state);
      })
      .catch(()=>{})
      
      // thunk.getState
    } catch {}
  }
);
// export const updatePicture = createAsyncThunk("update/picture", async (uid) => {
//   try {
//     const res = axios({
//       method: "get",
//       url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
//       withCredentials: true,
//     });
//     console.log(res);
//     return res.data;
//   } catch (err){console.log(err);}
// });
export const updateBio = createAsyncThunk("UPDATE_BIO", async (bio, thunk) => {
  try {
    return bio;
  } catch {}
});






const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

// Slice Redux
const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: initialUser,
    users: {},
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state, action) => {
      action = localStorage.removeItem("user");
      state.user = {};
    },
    //  uploadReducer: (state, action) => {
    //    switch (action.type) {
    //      case UPLOAD_PICTURE:
    //        return {
    //          ...state,
    //          picture: action.payload,
    //        };
    //      default:
    //        return state;
    //    }
    //  },
    userBio: (state, action) => {
      switch (action.type) {
        case UPDATE_BIO:
          return {
            ...state,
            bio: action.payload,
          };
        default:
          return state;
      }
    },
  },
  extraReducers: {
    [userInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [userInfo.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      // console.log("userInfo reducer");
    },
    [userInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [usersInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [usersInfo.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.users = action.payload;
      // console.log("userInfo reducer");
    },
    [usersInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [uploadPicture.pending]: (state, action) => {
      state.loading = true;
    },
    [uploadPicture.fulfilled]: (state, action) => {
      console.log("action", action);
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
    [uploadPicture.rejected]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = action.error.message;
    },
    [updateBio.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBio.fulfilled]: (state, action) => {
      console.log("action", action);
      switch (action.type) {
        case UPDATE_BIO:
          return {
            ...state,
            bio: action.payload,
          };
        default:
          return state;
      }
    },
    [updateBio.rejected]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = action.error.message;
    },
  },
});
//  console.log(userSlice);

export default userSlice.reducer;
export const { setUser, uploadReducer, userBio, clearUser } = userSlice.actions;
