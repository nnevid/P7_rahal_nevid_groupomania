import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UserProfil = () => {
  const {user} = useSelector((state) => state.user);
  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {user.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de Profil </h3>
          <img src={user.picture} alt="User"/>
          <UploadImg />
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
