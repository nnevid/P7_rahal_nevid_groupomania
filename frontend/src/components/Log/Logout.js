import React from 'react';
import { logout } from '../../store/user';


const Logout = () => {
 
   
   return (
     <li onClick={logout}>
      
      <img src="./img/icons/logout.svg" alt="logout icon" />
      <span className="nav-container__logs">Logout</span>
     </li>
     
     
   );
};

export default Logout;