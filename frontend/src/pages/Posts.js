import React, { useEffect, useState, useContext } from "react";
import LeftNav from '../components/LeftNav';
import NewPost from "../components/Post/NewPost";
import Log from "../components/Log";
import {UidContext} from '../components/AppContext';


const Posts = () => {
   const uid= useContext(UidContext);
   return (
      <div className="home">
          <LeftNav />
         
          <div className="main">
         {uid ? (
            <NewPost />
         ) : ( 
            <div className="home-header">
               <h2>Bienvenue chez Grupomania !</h2>
               <br/>
               <h4>Veuillez vous inscrire et/ou vous connecter pour commencer à échanger avec vos collègues!</h4>
            <Log signin={true} signup={false} />
            </div>
         )}
      </div>
      </div>
   );
};

export default Posts;