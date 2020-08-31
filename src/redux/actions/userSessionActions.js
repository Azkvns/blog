import { SET_USER_SESSION, REMOVE_USER_SESSION } from '../actionTypes';
import api from '../../services/apiService';
import { isSubmitedForm } from './formsActions';

export const setUserSession = (user) => {
  api.setToken(user.token);
  return {
    type: SET_USER_SESSION,
    payload: user,
  };
};

export const removeUserSession = () => {
  api.setToken(null);
  return {
    type: REMOVE_USER_SESSION,
  };
};

export const loadLocalSession = () => (dispatch) => {
  try {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      dispatch(setUserSession(JSON.parse(userSession)));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('loadLocalSession -> err', err);
  }
};

export const login = (email, password) => (dispatch) => {
  dispatch(isSubmitedForm(true));
  return api.Auth.login(email, password)
    .then(({ user }) => {
      dispatch(setUserSession(user));
      localStorage.setItem('userSession', JSON.stringify(user));
    })
    .finally(() => dispatch(isSubmitedForm(false)));
};

export const logout = () => (dispatch) => {
  dispatch(removeUserSession());
  localStorage.removeItem('userSession');
};

export const register = (username, email, password) => (dispatch) => {
  dispatch(isSubmitedForm(true));
  return api.Auth.register(username, email, password)
    .then(() => {
      dispatch(login(email, password));
    })
    .finally(() => dispatch(isSubmitedForm(false)));
};

export const save = (user) => (dispatch) => {
  const { username, email, password, image } = user;
  dispatch(isSubmitedForm(true));
  return api.Auth.save({ username, email, password, image })
    .then(() => {
      dispatch(setUserSession(user));
    })
    .finally(() => dispatch(isSubmitedForm(false)));
};
