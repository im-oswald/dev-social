import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types/profile";
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
