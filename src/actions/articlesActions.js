import {
  SET_ARTICLES,
  SET_ARTICLES_COUNT,
  SET_PAGE,
  SET_ARTICLES_LOADED,
  SET_ARTICLE_IS_FAVORITE,
  SET_ARTICLES_LOADING_ERROR,
} from '../types';
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
export const setArticlesLoaded = (value) => {
  return {
    type: SET_ARTICLES_LOADED,
    payload: value,
  };
};

export const setArticlesLoadingError = (value) => {
  return {
    type: SET_ARTICLES_LOADING_ERROR,
    payload: value,
  };
};

export const setPage = (number) => {
  return {
    type: SET_PAGE,
    payload: number,
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
    payload: { slug, value },
  };
};

export const loadArticles = (page) => (dispatch) => {
  dispatch(setArticlesLoadingError(false));
  dispatch(setArticlesLoaded(false));
  agent.Articles.all(page)
    .then((res) => {
      dispatch(setArticles(res.articles));
      dispatch(setArticlesCount(res.articlesCount));
      dispatch(setArticlesLoaded(true));
      dispatch(setPage(page));
    })
    .catch(() => {
      dispatch(setArticlesLoadingError(true));
    });
};
