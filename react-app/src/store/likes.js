const SET_COMMENT_LIKES = "likes/setCommentLikes";
const SET_POST_LIKES = "likes/setPostLikes";
const SET_ALL_LIKES = "likes/setAllLikes";
const MAKE_COMMENT_LIKES = "likes/makeCommentLikes";
const MAKE_POST_LIKES = "likes/makePostLikes";

const setCommentLikes = (likes) => {
  return {
    type: SET_COMMENT_LIKES,
    payload: likes,
  };
};
const setPostLikes = (likes) => {
  return {
    type: SET_POST_LIKES,
    payload: likes,
  };
};
const setAllLikes = (allLikes) => {
  return {
    type: SET_ALL_LIKES,
    payload: allLikes,
  };
};
// const makeCommentLikes = (likes) => {
//   return {
//     type: MAKE_COMMENT_LIKES,
//     payload: likes,
//   };
// };
const makePostLikes = (likes) => {
  return {
    type: MAKE_POST_LIKES,
    payload: likes,
  };
};
export const getAllLikes = () => async (dispatch) => {
  let allLikes = await fetch(`/api/likes`);
  allLikes = await allLikes.json();
  dispatch(setAllLikes(allLikes));
  return null;
};

export const getCommentLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/comments/${id}`);
  likes = await likes.json();
  dispatch(setCommentLikes(likes));
  return likes;
};
export const getPostLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/posts/${id}`);
  likes = await likes.json();
  dispatch(setPostLikes(likes));
  return likes;
};
export const createPostLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/posts/${id}`, {
    method: "POST",
  });
  likes = await likes.json();
  // dispatch(makePostLikes(likes));
  dispatch(getAllLikes());
  return likes;
};
export const deletePostLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/posts/delete/${id}`, {
    method: "POST",
  });
  dispatch(getAllLikes());
  return likes;
};
export const createCommentLikes = (id) => async (dispatch) => {

  let likes = await fetch(`/api/likes/comments/${id}`, {
    method: "POST",
  });
  likes = await likes.json();
  // dispatch(makeCommentLikes(likes));
  dispatch(getAllLikes());
  return likes;
};
export const deleteCommentLikes = (id) => async (dispatch) => {
  let likes = await fetch(`/api/likes/comments/delete/${id}`, {
    method: "POST",
  });
  dispatch(getAllLikes());
  return likes;
};

const initialState = [];

const likesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENT_LIKES:
      newState = [...state, ...action.payload];
      return newState;
    case SET_POST_LIKES:
      newState = [...state, ...action.payload];
      return newState;
    case SET_ALL_LIKES:
      // newState = action.payload.likes;
      newState = action.payload.likes
      return newState;

    case MAKE_COMMENT_LIKES:
      newState = [...state];
      if (newState) {
        newState.push(action.payload);
        return newState;
      } else {
        newState = [action.payload];
        return newState;
      }
    case MAKE_POST_LIKES:
      newState = [...state];
      if (newState) {
        newState.push(action.payload);
        return newState;
      } else {
        newState = [action.payload];
        return newState;
      }
    default:
      return state;
  }
};

export default likesReducer;
