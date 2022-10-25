import React, { useContext } from 'react';
import LeftNav from '../components/LeftNav';
import Thread from '../components/Thread';
import Log from "../components/Log"
import {UidContext} from '../components/AppContext';

const Home = () => {
   const uid= useContext(UidContext);
   return (
      <div className="home">
         <LeftNav />
         <div className="main">
         {uid ? (
            <Thread />
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

export default Home;