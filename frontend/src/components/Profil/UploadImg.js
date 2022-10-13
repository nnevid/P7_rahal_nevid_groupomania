import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../store/user";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
   
//  On Submit function
  const handlePicture = (e) => {
   // console.log(user);
    e.preventDefault();
    const data = new FormData();
    data.append('pseudo', user.pseudo);
    data.append('userId', user._id);
    data.append('file', file);
    dispatch(uploadPicture(data, user._id));
   //  for (var value of data.values()){
   //    console.log(value);
   //  }
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
