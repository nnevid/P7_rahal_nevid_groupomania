import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/post.actions";


const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
//   const [like, setLike] = useState(0);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  
  const handleLike = () => {
    dispatch(likePost(post._id, uid,));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };
  useEffect(() => {
    if (post.usersLiked.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.usersLiked, liked]);
  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={handleLike} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="like" />
      )}
      <span>{post.usersLiked.length}</span>
    </div>
  );
};

export default LikeButton;
