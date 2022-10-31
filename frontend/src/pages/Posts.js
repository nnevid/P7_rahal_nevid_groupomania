import React, { useEffect, useState, useContext } from "react";
import LeftNav from "../components/LeftNav";
import NewPost from "../components/Post/NewPost";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

const Posts = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />

      <div className="main">
        {uid ? (<>
         <h2>Envie de partager avec vos collègues?...c'est par ici 📱</h2><br/>
          <NewPost />
          </>
        ) : (
          <div className="home-header">
              <h2>Bienvenue chez Groupomania !</h2>
              <br />
              <h4>
                👉🏽 Créez votre compte ou connectez-vous et commencez à partager
                avec vos collègues 👈🏽
              </h4>
              <br />
            <div className="log-container">
              <Log login={false} signup={true} />
              <img className="home__img" src="./img/team_2.svg" alt="login" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
