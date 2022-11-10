import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "./types/profile";
import axios from 'axios';
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch(err) {
    dispatch({ type: PROFILE_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const saveProfile = (formData, navigate, edit = false) => async dispatch => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if(edit) {
      formData.skills = formData.skills.join(',');
    }

    const body = JSON.stringify(formData);

    const res = await axios.post('/api/profile', body, options);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    if(!edit) {
      navigate('/dashboard');
    }
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: PROFILE_ERROR });
  }
}

export const addEducation = (formData, navigate) => async dispatch => {
  try {
    const options = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(formData);

    const res = await axios.put('/api/profile/education', body, options);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education added to profile', 'success'));

    navigate('/dashboard')
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({ type: PROFILE_ERROR });
  }
}

export const addExperience = (formData, navigate) => async dispatch => {
  try {
    const options = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(formData);

    const res = await axios.put('/api/profile/experience', body, options);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience added to profile', 'success'));

    navigate('/dashboard')
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: PROFILE_ERROR });
  }
}

export const deleteEducation = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education deleted from profile', 'success'));
  } catch({ response }) {
    dispatch({ type: PROFILE_ERROR, payload: { status: response.status, msg: response.statusText } });
  }
}

export const deleteExperience = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience deleted from profile', 'success'));
  } catch({ response }) {
    dispatch({ type: PROFILE_ERROR, payload: { status: response.status, msg: response.statusText } });
  }
}

export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted', 'danger'));
    } catch(err) {
      dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
  }
}

export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  
  try {
    const res = await axios.get('/api/profile');

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch(err) {
    dispatch({ type: PROFILE_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const getProfileByUser = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch(err) {
    dispatch({ type: PROFILE_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}

export const getRepos = (username) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({ type: GET_REPOS, payload: res.data });
  } catch(err) {
    dispatch({ type: PROFILE_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}
