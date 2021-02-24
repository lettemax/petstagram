import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchComments, postComment } from "../../store/comments";

function CommentsPage() {
  const comments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.session.user);
  // const posts = useSelector((state) => state.posts);
  // const post = useSelector((state) => state.posts.onePost);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(user.id));
    // dispatch(fetchOnePost());
  }, [dispatch]);

  const comment = ({ prop }) => {
    return <div>{prop.content}</div>;
  };
  return <>{comments && <div>{comments.content}</div>}</>;

  // return (
  //   <>
  //     <div>"hello"</div>
  //   </>
  // );
  //also include the useSelector for post to display the post on this page as
  // well
}

export default CommentsPage;
