import { SET_ARTICLES, SET_ARTICLES_COUNT, SET_PAGE, SET_ARTICLES_IS_LOADED } from '../types';
import agent from '../agent';

export const setArticles = (articles) => {
  return {
    type: SET_ARTICLES,
    payload: articles,
  };
};

export const setArticlesCount = (count) => {
  return {
    type: SET_ARTICLES_COUNT,
    payload: count,
  };
};
export const setArticlesIsLoaded = (value) => {
  return {
    type: SET_ARTICLES_IS_LOADED,
    payload: value,
  };
};
export const setPage = (number) => {
  return {
    type: SET_PAGE,
    payload: number,
  };
};

export const loadArticles = (page) => (dispatch) => {
  dispatch(setArticlesIsLoaded(false));
  agent.Articles.all(page).then((res) => {
    dispatch(setArticles(res.articles));
    dispatch(setArticlesCount(res.articlesCount));
    dispatch(setArticlesIsLoaded(true));
    dispatch(setPage(page));
  });
};
