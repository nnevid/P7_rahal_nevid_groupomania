import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../redux/actions/user.actions";
// import axios from "axios";
// import { GET_USER_ERRORS } from "../../redux/actions/user.actions";
// import { UPLOAD_PICTURE } from "../../redux/actions/user.actions";
// import { UidContext } from "../../components/AppContext";
// import { UPLOAD_PICTURE } from "../../redux/features/authSlice";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userData);

  const data = new FormData();
  data.append("file", file);
  data.append("pseudo", user.pseudo);
  data.append("userId", user._id);

//  On Submit function
  const handlePicture = (e) => {
    e.preventDefault();
    dispatch(uploadPicture( data, user._id ));
  };

  //  Upload-Picture Form Layout
  return (
    <form className="upload-pic" action="" onSubmit={handlePicture}>
      <label htmlFor="file">Changer l'image du profil</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
