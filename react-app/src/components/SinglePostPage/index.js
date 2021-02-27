import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { fetchComments, deleteComment } from "../../store/comments";
import { deletePost } from "../../store/posts";
import {
  createCommentLikes,
  createPostLikes,
  getAllLikes,
  deletePostLikes,
  deleteCommentLikes,
} from "../../store/likes";
import {
  FavoriteBorder,
  MailOutline,
  ChatBubbleOutline,
} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import "./SinglePostPage.css";
import TimeAgo from "react-timeago";

function SinglePostPage() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  const likes = useSelector((state) => state.likes);
  let { postId } = useParams();
  postId = parseInt(postId, 10);

//   useEffect(() => {
//     //   if (!isNaN(postId)) {
//     //       console.log(postId)
//     //       dispatch(fetchComments(postId))
//     //   }
//     dispatch(getAllLikes());
//   }, [dispatch]);

  let post;
  if (posts) {
    if (posts.length) {
      const found = posts.find((post) => post.id === postId);
      if (found) {
        post = found;
      }
    }
  }

  let commentsArr = [];

  if (comments) {
    if (comments.length) {
      commentsArr = comments.filter((comment) => {
        return comment.postId === postId;
      });
    }
  }
  let likedPost = false;
  if (likes && post) {
    if (likes.length) {
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].userId === user.id && likes[i].postId === post.id) {
          likedPost = true;
        }
      }
    }
  }
  const postLikeToggle = (e) => {
    console.log("etarget", e.target.id);
    let id = parseInt(e.target.id, 10);
    let likeExists = false;
    console.log(likes)
    if (likes && !isNaN(id)) {
      if (likes.length) {
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].userId === user.id && likes[i].postId === id) {
            likeExists = true;
          }
        }
        console.log("likeExists", likeExists);
        if (!likeExists) {
          dispatch(createPostLikes(parseInt(e.target.id, 10)));
        }
        if (likeExists) {
          dispatch(deletePostLikes(parseInt(e.target.id, 10)));
        }
      }
    }
  };
  let commentLikeObj = {};
  if (likes) {
    commentsArr.forEach((comment) => {
      commentLikeObj[comment.id] = false;
      likes.forEach((like) => {
        if (like.userId == user.id && like.commentId == comment.id) {
          commentLikeObj[comment.id] = true;
        }
      });
    });
  }
  const commentLikeToggle = (e) => {
    let id = parseInt(e.target.parent.id, 10);
    if(!isNaN(id)){
        if (commentLikeObj[id]) {
          dispatch(deleteCommentLikes(id));
        } else {
          dispatch(createCommentLikes(id));
        }
    }
  };

  const history = useHistory();

  const onDeletePost = (e) => {
      console.log(e.currentTarget.id)
      let id = parseInt(e.currentTarget.id, 10)
      console.log(id)
      if (!isNaN(id)) {
        dispatch(deletePost(id))
        history.push('/')
      }
  }

  const onDeleteComment = (e) => {
    console.log(e.target.id)
    console.log(e.currentTarget.id)
    let id = parseInt(e.currentTarget.id, 10)
    console.log(id)
    if (!isNaN(id)) {
      dispatch(deleteComment(id))
    //   history.push('/')
    }
}

  

  return (
    <div>
      {post && (
        <div className="page-container">
          <div
            className="container posts"
            style={{ paddingTop: "0", marginBottom: "5vh" }}
          >
            <div className="post-user-info">
              <div
                className="rounded-img-container comments-profile-pictures"
                style={{ alignSelf: "flex-start" }}
              >
                <Link to={`/users/${post.userId}`}>
                  <img
                    src={post.photo}
                    alt="profilepicposter"
                    className="comments-profile-pictures redirect-profile"
                  />
                </Link>
              </div>
              <div className="username-comments-container">
                <Link to={`/users/${post.userId}`}>
                  <h5 className="post-username redirect-profile">
                    {post.username}
                  </h5>
                </Link>
              </div>
            </div>
            <div className="post-image-container">
              <img src={post.imageLinks} alt="postphoto" />
            </div>
            <div
              className="flex-left-container"
              style={{ width: "100%", height: "40px" }}
            >
              <div className="icons-container">
                {likedPost ? (
                  <FavoriteBorder
                    onClick={postLikeToggle}
                    id={post.id}
                    className="liked"
                  />
                ) : (
                  <FavoriteBorder onClick={postLikeToggle} id={post.id} />
                )}
              </div>
              <div className="icons-container">
                <MailOutline />
              </div>
              <div className="icons-container">
                <ChatBubbleOutline />
              </div>
              {post.userId == user.id &&
                  <div className="icons-container">
                    <DeleteIcon id={post.id} onClick={onDeletePost} />
                </div>
              }
              
            </div>
            <div className="caption-section">
              <div className="username-comments-container">
                <Link to={`/users/${post.userId}`}>
                  <h5 className="post-username redirect-profile">
                    {post.username}
                  </h5>
                </Link>
              </div>
              <div className="post-caption-container">
                <p className="normalize-text caption">{post.caption}</p>
              </div>
            </div>
            <div
              className="normalize-text flex-left-container"
              style={{ width: "100%", paddingLeft: "12px" }}
            >
              <TimeAgo date={post.createdAt} />
            </div>
            {commentsArr.length > 0 && (
              <div
                className="caption-section"
                style={{ flexDirection: "column" }}
              >
                {commentsArr.map((comment) => (
                  <div
                    className="comments"
                    key={comment.id}
                    style={{ width: "100%" }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <div className="rounded-img-container comments-profile-pictures">
                        <Link to={`/users/${comment.userId}`}>
                          <img
                            src={comment.photo}
                            alt="commenter-profile"
                            className="comments-profile-pictures"
                          />
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div
                        className="flex-container"
                        style={{ width: "496px" }}
                      >
                        <div className="username-comments-container">
                          <Link to={`/users/${comment.userId}`}>
                            <h5
                              className="post-username redirect-profile"
                              style={{ paddingLeft: "0" }}
                            >
                              {comment.username}
                            </h5>
                          </Link>
                          <p className="normalize-text">{comment.content}</p>
                        </div>
                      </div>
                      <div className="flex-container">
                        <div className="normalize-text time-display">
                          <TimeAgo date={new Date(comment.createdAt)} />
                          <p
                            className="normalize-text"
                            style={{
                              margin: "0 12px",
                              fontSize: "10px",
                              color: "rgb(142, 142, 142)",
                            }}
                          >
                            {`# likes`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="icons-container"
                      style={{ margin: "0 12px 0 24px", alignSelf: "center" }}
                    >
                      {" "}
                      {commentLikeObj[comment.id] ? (
                        <FavoriteBorder
                          className="liked"
                          onClick={commentLikeToggle}
                          id={comment.id}
                        />
                      ) : (
                        <FavoriteBorder
                          onClick={commentLikeToggle}
                          id={comment.id}
                        />
                      )}
                      {comment.userId == user.id &&
                        <DeleteIcon id={comment.id} onClick={onDeleteComment} />
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePostPage;
