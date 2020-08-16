import { SET_ARTICLE, SET_ARTICLE_IS_LOADED, REMOVE_ARTICLE } from '../types';
import agent from '../agent';

export const setArticle = (article) => {
  return {
    type: SET_ARTICLE,
    payload: article,
  };
};

export const removeArticle = () => {
  return {
    type: REMOVE_ARTICLE,
  };
};

export const setArticleIsLoaded = (value) => {
  return {
    type: SET_ARTICLE_IS_LOADED,
    payload: value,
  };
};

export const loadArticle = (slug) => (dispatch) => {
  dispatch(setArticleIsLoaded(false));
  agent.Articles.get(slug).then((res) => {
    dispatch(setArticle(res.article));
    dispatch(setArticleIsLoaded(true));
  });
};
