import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../actions/types/auth";
import { ACCOUNT_DELETED } from "../actions/types/profile";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: true
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, loading: false, isAuthenticated: true };
    case USER_LOADED:
      return { ...state, user: payload, loading: false, isAuthenticated: true };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return { ...state, token: null, loading: false, isAuthenticated: false };
    default:
      return state;
  }
}
