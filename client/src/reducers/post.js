import { GET_POSTS, POST_ERROR } from '../actions/types/post';

const initialState = {
  posts: [],
  post: {},
  loading: true,
  error: {}
}

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_POSTS:
      return { ...state, posts: payload, laoding: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
