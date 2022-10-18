import React from 'react';
// import axios from 'axios';
// import cookie from "js-cookie";

import { useDispatch } from "react-redux";
import { logout } from '../../redux/features/authSlice';
// const removeCookie = (key) => {
//   if (window !== "undefined") {
//     cookie.remove(key, { expires: 1 });
//   }
// };



// Logout
const Logout = () => {
   const dispatch = useDispatch()
 
   const handleLogout = () => {
      dispatch(logout());
    };
   
   return (
     <li onClick={handleLogout}>
      
      <img src="./img/icons/logout.svg" alt="logout icon" />
      <span className="nav-container__logs">Logout</span>
     </li>
     
     
   );
};

export default Logout;