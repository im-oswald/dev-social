import { GET_PROFILE, PROFILE_ERROR } from "./types/profile";
import axios from 'axios';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch(err) {
    dispatch({ type: PROFILE_ERROR, payload: { status: err.response.status, msg: err.response.statusText } });
  }
}
