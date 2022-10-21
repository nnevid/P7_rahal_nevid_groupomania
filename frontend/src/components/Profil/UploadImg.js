import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../redux/features/authSlice";
// import axios from "axios";
import { UidContext } from "../../components/AppContext";
// import { UPLOAD_PICTURE } from "../../redux/features/authSlice";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userInfo.user);
  const uid = useContext(UidContext);

  //  On Submit function
  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("pseudo", user.pseudo);
    data.append("userId", user._id);
   // const datUid = ({data, uid})
    dispatch(uploadPicture( data, uid ));
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
