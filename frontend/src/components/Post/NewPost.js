import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Card";
import { timestampParser } from "./CardComments";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../redux/actions/post.actions";

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const user = useSelector((store) => store.userData);
  const error = useSelector((state) => state.errorData.postError);
  const dispatch = useDispatch();

  const handlePost = async () => {
   if (content.length === 0) {
      alert("Veuillez entrer un message");
    } 
   if (document.getElementById("file-upload").files.length === 0) {
      alert("Veuillez rajouter une image");
    }
    
     else {
      if (content || postPicture) {
        const data = new FormData();
        data.append("userId", user._id);
        data.append("content", content);
        if (file) data.append("file", file);
        await dispatch(addPost(data));
        window.location = "/";

        cancelPost();
        // } else {

        //   alert("Veuillez entrer un message")
        // }
        // window.location= '/';
      }
    }
  };
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const cancelPost = () => {
    setContent("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      {!isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img
                src={"./uploads/profil/" + user._id + ".jpg"}
                alt="user-img"
              />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {content || postPicture ? (
              <li className="card-container">
                <div className="card-left">
                  <img
                    src={"./uploads/profil/" + user._id + ".jpg"}
                    alt="user-pic"
                  />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{user.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{content}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                }
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {content || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPost;
