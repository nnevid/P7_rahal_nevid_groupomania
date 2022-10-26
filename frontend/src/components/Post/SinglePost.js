import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftNav from "../LeftNav";
import CardComments from "./CardComments";
import LikeButton from "./LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Confirm from "../Profil/Confirm";
import { DELETE_POST } from "../../redux/actions/post.actions";
import { updateSinglePost } from "../../redux/actions/single.post.action";
import { getSinglePost } from "../../redux/actions/single.post.action";
// import { isEmpty } from "./Card";

const SinglePost = () => {
  const dispatch = useDispatch();
  const postId = useParams();
  const usersData = useSelector((store) => store.allUsersData.users);
  const user = useSelector((store) => store.userData);
  const postLoad = useSelector((store) => store.singlePost.loading);
  const post = useSelector((store) => store.singlePost);
  
 
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const [confirm, setConfirm] = useState({
    message: "",
    isLoading: false,
  });

  useEffect(() => {
    dispatch(getSinglePost(postId.id));
  }, [dispatch, postId]);

  // Delete Post
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
      // dispatch(deletePost(post._id, user._id));

      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: post._id });
          window.location = "/";
          handleConfirm("", false);
        })
        .catch((err) => console.log(err.message));
    } else {
      handleConfirm("", false);
    }
  };

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updateSinglePost(post._id, textUpdate));
      }
    setIsUpdated(false);
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
    <div className="home">
      {postLoad === true ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <LeftNav />
          <div className="main">
            <div className="thread-container">
              <li className="card-container">
                <div className="card-left">
                  <img
                    src={usersData
                      .map((user) => {
                        if (user._id === post.userId)
                          return "./uploads/profil/" + user._id + ".jpg";
                        else return null;
                      })
                      .join("")}
                    alt="post-pict"
                  />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>
                        {usersData
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
                          <button onClick={updateItem}>
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

                        <button className="" onClick={handleDelete}>
                          Supprimer mon post{" "}
                          <img src="./img/icons/trash.svg" alt="trash" />
                        </button>
                        {confirm.isLoading && (
                          <Confirm
                            onConfirm={realConfirm}
                            message={confirm.message}
                          />
                        )}
                      </div>
                    )}
                    {user.isAdmin === true && (
                      <div className="button-container">
                        <div onClick={() => setIsUpdated(!isUpdated)}>
                          <span>Modifier mon post</span>
                          <img src="./img/icons/edit.svg" alt="edit" />
                        </div>

                        <button className="" onClick={handleDelete}>
                          Supprimer mon post{" "}
                          <img src="./img/icons/trash.svg" alt="trash" />
                        </button>
                        {confirm.isLoading && (
                          <Confirm
                            onConfirm={realConfirm}
                            message={confirm.message}
                          />
                        )}
                      </div>
                    )}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="card-pic"
                        className="card-pic"
                      />
                    )}
                  </div>
                  <div className="card-footer">
                    <div className="comment-icon">
                      <img
                        onClick={() => setShowComments(!showComments)}
                        src="./img/icons/message1.svg"
                        alt="comment"
                      />
                      <span>{post.comments.length}</span>
                    </div>
                    <LikeButton post={post} />
                  </div>
                  {showComments && <CardComments post={post} />}
                </div>
              </li>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;