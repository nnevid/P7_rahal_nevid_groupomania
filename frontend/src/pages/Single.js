import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getSinglePost } from "../redux/actions/single.post.action";
import SinglePost from "../components/Post/SinglePost";
import { useParams } from "react-router-dom";


const Single = () => {
//   const dispatch = useDispatch();
//   const postId = useParams();
 
//   const post = useSelector((store) => store.singlePost.post);
//   useEffect(() => {
//     dispatch(getSinglePost(postId.id));
//   }, [dispatch, postId]);

  return (
    <div>
      

      <SinglePost />;
     
      
      
    </div>
  );
};

export default Single;
