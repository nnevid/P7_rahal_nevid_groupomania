// Page de signup & login
import React, { useContext } from 'react';
import Log from '../components/Log'
import {UidContext} from '../components/AppContext';
import UserProfil from '../components/Profil/UserProfil';


const Profil = () => {
   const uid= useContext(UidContext);
   return (
      <div className='profil-page'>
         {uid ? (
            <UserProfil />
         ) : (
         <div className='log-container'>
         <Log login={false} signup={true}  />
         <div className="img-container">
         <img src="./img/log.svg" alt="login" />
         </div>
         </div>
         )}
         
      </div>
   );
};

export default Profil;
