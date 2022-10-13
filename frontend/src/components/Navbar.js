import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import {useSelector} from 'react-redux';


const Navbar = () => {
   const uid = useContext(UidContext);
   const {user} = useSelector((store) => store.user);
  
 
   
//   console.log(user);
// console.log(useSelector((store)=>{console.log(store);}))
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/logo-grupomania.svg" alt="Grupomania logo" />
              <span className="nav-container__coname">Grupomania</span><br/>
            </div>
              <span className="nav-container__slogan">Le réseau des collègues !</span>              
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5> Bienvenue {user.pseudo} 👋🏽 </h5>
                
              </NavLink>
            </li>
           <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
               <img src="./img/icons/login.svg" alt="icon to login" />
               <span className="nav-container__logs">Login</span>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
