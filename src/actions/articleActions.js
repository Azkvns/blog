import { SET_ARTICLE, SET_ARTICLE_LOADING, SET_ARTICLE_IS_FAVORITE, REMOVE_ARTICLE } from '../types';
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

export const setArticleLoading = (value) => {
  return {
    type: SET_ARTICLE_LOADING,
    payload: value,
  };
};

export const loadArticle = (slug) => (dispatch) => {
  dispatch(setArticleLoading(true));
  agent.Articles.get(slug).then((res) => {
    dispatch(setArticle(res.article));
    dispatch(setArticleLoading(false));
  });
};

export const delArticle = (slug) => (dispatch) => {
  agent.Articles.del(slug).then(() => {
    dispatch(removeArticle());
  });
};
