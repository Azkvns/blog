import {
  SET_ARTICLE,
  SET_ARTICLE_LOADED,
  SET_ARTICLE_IS_FAVORITE,
  REMOVE_ARTICLE,
  SET_ARTICLE_LOADING_ERROR,
} from '../types';
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

export const setArticleIsFavorite = (slug, value) => {
  if (value) {
    agent.Articles.favorite(slug);
  } else {
    agent.Articles.unfavorite(slug);
  }
  return {
    type: SET_ARTICLE_IS_FAVORITE,
    payload: value,
  };
};

export const setArticleLoaded = (value) => {
  return {
    type: SET_ARTICLE_LOADED,
    payload: value,
  };
};

export const setArticleLoadingError = (value) => {
  return {
    type: SET_ARTICLE_LOADING_ERROR,
    payload: value,
  };
};

export const loadArticle = (slug) => (dispatch) => {
  dispatch(setArticleLoadingError(false));
  dispatch(setArticleLoaded(false));
  agent.Articles.get(slug)
    .then((res) => {
      dispatch(setArticle(res.article));
      dispatch(setArticleLoaded(true));
    })
    .catch(() => {
      dispatch(setArticleLoadingError(true));
    });
};

export const delArticle = (slug) => (dispatch) => {
  agent.Articles.del(slug).then(() => {
    dispatch(removeArticle());
  });
};
