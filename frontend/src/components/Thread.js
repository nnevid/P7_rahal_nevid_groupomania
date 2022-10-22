import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/post.actions";
import Card from "./Post/Card";

// import { UidContext } from "./AppContext";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.postData);
  // const uid = useContext(UidContext);
//   console.log(posts);
const isEmpty = (value) => {
   return (
     value === undefined ||
     value === null ||
     (typeof value === "object" && Object.keys(value).length === 0) ||
     (typeof value === "string" && value.trim().length === 0)
   );
 };
 
  
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts())
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
  <div className="thread-container">
   <ul>
     {!isEmpty(posts[0]) && posts.map((post) => {
      return <Card post={post} key={post._id}/>
     })}
      
   </ul>
  </div>
  )
};

export default Thread;
