import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteComment, editComment, postComment } from "../../store/comments";
import { deletePost, editPost } from "../../store/posts";
import {
    createCommentLikes,
    createPostLikes,
    deletePostLikes,
    deleteCommentLikes,
} from "../../store/likes";
import EditIcon from '@material-ui/icons/Edit';
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
    const commentLikeObj = likes.commentLikes
    const postLikeObj = likes.postLikes
    let { postId } = useParams();
    postId = parseInt(postId, 10);

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
    let likedPost = false
    if(post){
        if(postLikeObj[post.id]){
            likedPost = true;
        }
    }
    // if (likes && post) {
    //     if (likes.length) {
    //         for (let i = 0; i < likes.length; i++) {
    //             if (likes[i].userId === user.id && likes[i].postId === post.id) {
    //                 likedPost = true;
    //             }
    //         }
    //     }
    // }
    const postLikeToggle = (e) => {
        let id = parseInt(e.currentTarget.id, 10);

        if(isNaN(id)){
            id = parseInt(e.target.id, 10);
        }
       
        if (!postLikeObj[id]) {
            dispatch(createPostLikes(id));
        }
        else {
            dispatch(deletePostLikes(id));
        }

    };
    // let commentLikeObj = {};
    // if (likes) {
    //     commentsArr.forEach((comment) => {
    //         commentLikeObj[comment.id] = false;
    //         likes.forEach((like) => {
    //             if (like.userId === user.id && like.commentId === comment.id) {
    //                 commentLikeObj[comment.id] = true;
    //             }
    //         });
    //     });
    // }
    const commentLikeToggle = (e) => {
        let id = parseInt(e.currentTarget.id, 10);
        if (!isNaN(id)) {
            if (commentLikeObj[id]) {
                dispatch(deleteCommentLikes(id));
            } else {
                dispatch(createCommentLikes(id));
            }
        }
    };

    const history = useHistory();

    const onDeletePost = (e) => {
        let id = parseInt(e.currentTarget.id, 10)
        if (!isNaN(id)) {
            dispatch(deletePost(id))
            history.push('/')
        }
    }

    const onDeleteComment = (e) => {
        let id = parseInt(e.currentTarget.id, 10)
        if (!isNaN(id)) {
            dispatch(deleteComment(id))
        }
    }

    const [editingPost, setEditingPost] = useState(false)
    const [caption, setCaption] = useState('')

    const openEditPost = (e) => {
        setEditingPost(true);
    }

    const updateCaption = (e) => {
        setCaption(e.target.value)
    }

    const submitEditPost = (e) => {
        let id = parseInt(e.target.id, 10)
        dispatch(editPost(id, caption))
        setEditingPost(false)
    }

    const [editingComment, setEditingComment] = useState(false)
    const [comment, setComment] = useState('')
    const [targetCommentId, setTargetCommentId] = useState('')

    const openEditComment = (e) => {
        const id =  parseInt(e.currentTarget.id, 10)
        setTargetCommentId(id)
        setEditingComment(true);
    }

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    const submitEditComment = (e) => {
        let id = parseInt(e.target.id, 10)
        dispatch(editComment(id, comment))
        setEditingComment(false)
    }



    const [newComment, setNewComment] = useState('')

    const updateNewComment = (e) => {
        setNewComment(e.target.value)
    }

    const submitNewComment = (e) => {
        dispatch(postComment(e.target.id, newComment))
        document.getElementById("new-comment-inp").value = ''
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
                            {post.userId === user.id &&
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
                                {/* if it's our post and were not editing it yet, we should see our caption and the edit icon */}
                                {/* if it's not our post and we're not editing it yet, we should see the caption and no edit icon */}
                                {/* if it's our post and we're editing it, we should see the caption inside the input field and no edit icon */}
                                {(!editingPost && (post.userId === user.id)) &&
                                    <div>
                                        <p className="normalize-text caption">{post.caption}</p> 
                                        <EditIcon id={post.id} onClick={openEditPost} /> 
                                    </div>
                                }
                                {(!editingPost && (post.userId !== user.id)) &&
                                     <p className="normalize-text caption">{post.caption}</p> 
                                }
                                {(editingPost && (post.userId === user.id)) &&
                                    <div>
                                        <input onChange={updateCaption} id={post.id} placeholder={post.caption}></input> 
                                        <button id={post.id} onClick={submitEditPost}>submit edit</button>
                                    </div>
                                }
                                
                            </div>
                        </div>
                        <div
                            className="normalize-text flex-left-container"
                            style={{ width: "100%", paddingLeft: "12px" }}
                        >
                            <TimeAgo date={post.createdAt} />
                            <p className='normalize-text' style={{paddingLeft: '12px' , color: 'rgb(142, 142, 142)', fontWeight: '600' }}>
                                {post.likes==1 ? `1 like` :
                                    `${post.likes} likes`
                                }
                            </p>
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
                                                    {/* if it's our post and were not editing it yet, we should see our caption and the edit icon */}
                                                    {/* if it's not our post and we're not editing it yet, we should see the caption and no edit icon */}
                                                    {/* if it's our post and we're editing it, we should see the caption inside the input field and no edit icon */}
                                                    {(!editingComment && (comment.userId === user.id)) &&
                                                        <div>
                                                            <p className="normalize-text caption">{comment.content}</p> 
                                                            <EditIcon id={comment.id} onClick={openEditComment} /> 
                                                        </div>
                                                    }
                                                    {(!editingComment && (comment.userId !== user.id)) &&
                                                        <p className="normalize-text caption">{comment.content}</p> 
                                                    }
                                                    {(editingComment && (comment.userId === user.id) && targetCommentId === comment.id) &&
                                                        <div>
                                                            <input onChange={updateComment} id={comment.id} placeholder={comment.content}></input> 
                                                            <button id={comment.id} onClick={submitEditComment}>submit edit</button>
                                                        </div>
                                                    }
                                                    
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
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        {comment.likes==1 ? `1 like` :
                                                            `${comment.likes} likes`
                                                        }
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
                                            {/* {comment.userId == user.id &&
                                                <div>
                                                    <EditIcon id={comment.id} onClick={openEditComment} />
                                                    <DeleteIcon id={comment.id} onClick={onDeleteComment} />
                                                </div>
                                            } */}
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        )}
                        {
                        <>
                            <input id="new-comment-inp" onChange={updateNewComment} placeholder="add new comment"></input>
                            <div className="submit-comment-button-container">
                                <button id={post.id} className="blue-submit-button" onClick={submitNewComment}>submit comment</button>
                            </div>
                        </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default SinglePostPage;
