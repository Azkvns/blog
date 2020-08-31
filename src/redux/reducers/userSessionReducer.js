import { SET_USER_SESSION, REMOVE_USER_SESSION } from '../actionTypes';

export default function userReducer(state = { isLogged: false }, action) {
  switch (action.type) {
    case SET_USER_SESSION:
      return { ...state, ...action.payload, isLogged: true };
    case REMOVE_USER_SESSION:
      return { isLogged: false };
    default:
      return state;
  }
}
