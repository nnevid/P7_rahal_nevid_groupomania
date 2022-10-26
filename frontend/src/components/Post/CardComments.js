import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../redux/actions/post.actions";
import { getSinglePost } from "../../redux/actions/single.post.action";
import { isEmpty } from "./Card";
import EditDeleteComment from "./EditDeleteComment";

export const timestampParser = (num) => {
   let options = {
     hour: "2-digit",
     minute: "2-digit",
     second: "2-digit",
     weekday: "long",
     year: "numeric",
     month: "short",
     day: "numeric",
   };
 
   let date = new Date(num).toLocaleDateString("fr-FR", options);
 
   return date.toString();
 }


const CardComments = ({post}) => {
   const [text, setText] = useState("");
   const usersData = useSelector((store) => store.allUsersData.users);
   const user = useSelector((store) => store.userData);
   const dispatch = useDispatch();

   

   const handleComment = (e) => {
      e.preventDefault();
  
      if (text) {
        dispatch(addComment(post._id, user._id, text, user.pseudo))
          .then(() => dispatch(getPosts()))
          .then(() => dispatch(getSinglePost(post._id)))
          .then(() => setText(''));
      }
    };
   return (
      <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === user._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return "./uploads/profil/" + user._id + ".jpg";
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {user._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
   );
};

export default CardComments;