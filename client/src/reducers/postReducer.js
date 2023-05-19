const SET_POSTS = "SET_POSTS";
const EMPTY_POSTS = "EMPTY_POSTS";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_POSTSCOUNT = "SET_POSTSCOUNT";

const defaultState = {
  posts: [],
  totalCount: 20,
};

export default function postReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };
    case EMPTY_POSTS:
      return { ...state, posts: [] };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        totalCount: state.totalCount + 1,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.payload)],
        totalCount: state.totalCount - 1,
      };
    case SET_POSTSCOUNT:
      return { ...state, totalCount: action.payload };

    default:
      return state;
  }
}

export const setPosts = (posts) => ({ type: SET_POSTS, payload: posts });
export const emptyPosts = () => ({ type: EMPTY_POSTS });
export const addPost = (post) => ({ type: ADD_POST, payload: post });
export const deletePost = (postId) => ({ type: DELETE_POST, payload: postId });
export const setPostsCount = (payload) => ({ type: SET_POSTSCOUNT, payload });
