import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';



const Card = ({post}) => {
   
   const usersData = useSelector((store) => store.userInfo.users)
   const isLoading = useSelector((store) => store.userInfo.loading)
   const isEmpty = (value) => {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    };
   
   return (
      <li className='card-container' key={post._id}>
         {isLoading ? (
            <i className='fas fa-spinner fa-spin'></i>
         ):(
            <>
            <div className="card-left">   
            <img src="" alt="imgname"/>
            </div>
            </>
         )}
      </li>
   );
};

export default Card;