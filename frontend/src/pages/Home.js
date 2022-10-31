import React, { useContext } from "react";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        {uid ? (
          <Thread />
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
            </div>
            <img className="home__img" src="./img/team_1.svg" alt="login" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
