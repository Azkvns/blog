import { SET_USER_SESSION, REMOVE_USER_SESSION } from '../types';
import agent from '../agent';

export const setUserSession = (user) => {
  agent.setToken(user.token);
  return {
    type: SET_USER_SESSION,
    payload: user,
  };
};

export const removeUserSession = () => {
  agent.setToken(null);
  return {
    type: REMOVE_USER_SESSION,
  };
};

export const login = (email, password) => (dispatch) => {
  return agent.Auth.login(email, password).then(({ user }) => {
    dispatch(setUserSession(user));
    localStorage.setItem('userSession', JSON.stringify(user));
  });
};

export const register = (username, email, password) => (dispatch) => {
  return agent.Auth.register(username, email, password).then(() => {
    dispatch(login(email, password));
  });
};

export const save = (user) => (dispatch) => {
  const { username, email, password, image } = user;
  return agent.Auth.save({ username, email, password, image }).then(() => {
    dispatch(setUserSession(user));
  });
};
