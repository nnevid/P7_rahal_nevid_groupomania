import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/actions/post.actions";
import Confirm from "../Profil/Confirm";


const DeleteCard = (props) => {
   const dispatch = useDispatch();
   const [confirm, setConfirm] = useState({
      message: "",
      isLoading: false,
    });
    const handleConfirm = (message, isLoading) => {
      setConfirm({
        message,
        isLoading,
      });
    };
    const handleDelete = () => {
      handleConfirm("Voulez-vous supprimer votre post ?", true);
    };
  
    const realConfirm = async (yes) => {
      if (yes) {
         dispatch(deletePost(props.id));
        window.location = "/";
        handleConfirm("", false);
      } else {
        handleConfirm("", false);
      }
    };
   // const deleteQuote = () => dispatch(deletePost(props.id));
 
   return (
     <div  onClick={handleDelete}>
       <img src="./img/icons/trash.svg" alt="trash" />
       {confirm.isLoading && (
              <Confirm onConfirm={realConfirm} message={confirm.message} />
            )}
     </div>
   );
   // return (
   //   <div
   //     onClick={() => {
   //       if (window.confirm("Voulez-vous supprimer ce post ?")) {
   //         deleteQuote();
   //       }
   //     }}
   //   >
   //     <img src="./img/icons/trash.svg" alt="trash" />
   //   </div>
   // );
 };
 
 export default DeleteCard;