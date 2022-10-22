import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector, useDispatch } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../redux/actions/user.actions";
import axios from "axios";
import Confirm from "./Confirm";

const UserProfil = () => {
  const user = useSelector((store) => store.userData);
  console.log(user.pseudo);
  
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [confirm, setConfirm] = useState({
    message: "",
    isLoading: false,
  });
  const dispatch = useDispatch();
  const date = user.createdAt;
  const userDate = new Date(date).toLocaleDateString("fr-Fr", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Bio Update Function
  const handleUpdate = () => {
   dispatch(updateBio(user._id, bio));
    setUpdateForm(false);
    
    }
//   Confirmation Pop-up
  const handleConfirm = (message, isLoading) => {
    setConfirm({
      message,
      isLoading,
    });
  };
  const handleDelete = () => {
    handleConfirm("Supprimer votre compte Grupomania ?", true);
  };

  const realConfirm = async (yes) => {
    if (yes) {
     await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/user/` + user._id,
      });
      window.location = "/profil";
      handleConfirm("", false);
    } else {
      handleConfirm("", false);
    }
  };
  // "./uploads/profil/" + user._id + ".jpg"
  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {user.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de Profil </h3>
          <img src={"./uploads/profil/" + user._id + ".jpg"} alt="User" />
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
                  Modifier ma Bio
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
            <div>
              <h4>Membre depuis le {userDate}</h4>
            </div>
            <br />
            <button onClick={handleDelete}>Supprimer mon profil</button>
            {confirm.isLoading && (
              <Confirm onConfirm={realConfirm} message={confirm.message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
