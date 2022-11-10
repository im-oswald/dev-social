import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from './../actions/types/profile';

const initialState = {
  profile: {},
  profiles: [],
  repos: [],
  error: {},
  loading: true
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false, error: {} };
    case PROFILE_ERROR:
      return { ...state, profile: {}, error: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: {}, repos: [] };
    case GET_REPOS:
      return { ...state, repos: payload, loading: false }
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false }
    default:
      return state;
  }
}