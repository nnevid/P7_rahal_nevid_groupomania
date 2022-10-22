// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, deletePost } from "../../redux/actions/post.actions";
// import DeletePost from "./DeletePost";
import Confirm from "../Profil/Confirm";
// import { DELETE_POST } from "../../redux/actions/post.actions";

const Card = ({ post }, props) => {
  const dispatch = useDispatch();
  const usersData = useSelector((store) => store.allUsersData.users);
  const user = useSelector((store) => store.userData);
  const isLoading = useSelector((store) => store.postData.loading);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
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
      dispatch(deletePost(post._id, user._id));
      
     window.location = "/";
     handleConfirm("", false);
   } else {
     handleConfirm("", false);
   }
 };

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  // DATE PARSER :
  const date = post.createdAt;
  const postDate = new Date(date).toLocaleDateString("fr-Fr", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.userId)
                      return "./uploads/profil/" + user._id + ".jpg";
                    else return null;
                  })
                  .join("")
              }
              alt="post-pict"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.userId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              {isUpdated === false && (
                <div>
                  <p>{post.content}</p>
                  <span>Publié le {postDate}</span>
                </div>
              )}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.content}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                      Valider modification
                    </button>
                  </div>
                </div>
              )}
              
              {user._id === post.userId && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <span>Modifier mon post</span>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <div onClick={handleDelete}>
                  <img src="./img/icons/trash.svg" alt="trash" />

                  </div>
                  {/* <button onClick={handleDelete}>Supprimer mon post</button> */}
                  {/* <img onClick={handleDelete} src="./img/icons/trash.svg" alt="trash" /> */}
            {confirm.isLoading && (
              <Confirm onConfirm={realConfirm} message={confirm.message} />
            )}
                </div>
              )}
              {post.imageUrl && (
                <img src={post.imageUrl} alt="card-pic" className="card-pic" />
              )}
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
