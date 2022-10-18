import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from "react-redux";
import UploadImg from "./UploadImg";
 import {userBio, UPDATE_BIO} from '../../redux/features/authSlice';
 import axios from "axios";

 



const UserProfil = () => {
const user = useSelector((store) => (store.userInfo.user));

  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  
  
  const handleUpdate = () =>{
   // dispatch(updateBio(bio));
   setUpdateForm(false)
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + user._id,
      data: { bio },
    })
      .then((res) => {
        dispatch(userBio({ type: UPDATE_BIO, payload: bio }));
        window.location = '/profil'
      })
      .catch((err) => console.error(err));
  }

// "./uploads/profil/" + user._id + ".jpg"
  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {user.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de Profil </h3>
          <img src={ "./uploads/profil/"+user._id+ ".jpg" } alt="User" />
          <UploadImg />
          <p></p>
          <p></p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{user.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier Bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={user.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
