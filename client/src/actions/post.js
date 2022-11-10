import axios from "axios"
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT } from "./types/post"

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch(err) {
    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const likePost = (id) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/${id}/like`);

    dispatch({ type: UPDATE_LIKES, payload: { likes: res.data, _id: id } });
  } catch(err) {
    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const unlikePost = (id) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/${id}/unlike`);

    dispatch({ type: UPDATE_LIKES, payload: { likes: res.data, _id: id } });
  } catch(err) {
    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const deletePost = (id) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: { id } });

    dispatch(setAlert('Post deleted', 'success'));
  } catch(err) {
    dispatch(setAlert('Error while deleting post', 'danger'));
    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const addPost = (formData) => async dispatch => {
  try {
    const options = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(formData);

    const res = await axios.post('/api/posts', body, options);

    dispatch({ type: ADD_POST, payload: res.data });
  } catch(err) {
    const errors = err.response.data;
    if(errors) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const getPost = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`)

    dispatch({ type: GET_POST, payload: res.data })
  } catch(err) {
    const errors = err.response.data;
    if(errors) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } })
  }
}

export const addComment = (formData, id) => async dispatch => {
  try {
    const options = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(formData);

    const res = await axios.post(`/api/posts/${id}/comment`, body, options);

    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert('Comment Added', 'success'));
  } catch(err) {
    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const deleteComment = (id, comment_id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}/comment/${comment_id}`)

    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert('Comment Removed', 'danger'))
  } catch(err) {
    dispatch({ type: POST_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}
