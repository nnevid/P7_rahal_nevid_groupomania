// Page de signup & login
import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UserProfil from "../components/Profil/UserProfil";
import LeftNav from "../components/LeftNav";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      <LeftNav />
     {uid ? (
        <UserProfil />
      ) : (
         <>
         <h2 className="profil-page__heading">Bienvenue chez Grupomania!</h2>
      <br />
      <h4 className="profil-page__message">
        👉🏽 Créez votre compte ou connectez-vous et commencez à partager avec vos
        collègues 👈🏽
      </h4>
        <div className="log-container">
          <Log login={false} signup={true} />
          <div className="img-container">
            <img src="./img/team_3.svg" alt="login" />
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default Profil;
