import {
  SET_ARTICLES,
  SET_ARTICLES_COUNT,
  SET_PAGE,
  SET_ARTICLES_LOADED,
  ARTICLE_FAVORITE_SUCCESS,
  ARTICLE_FAVORITE_ERROR,
  SET_ARTICLES_LOADING_ERROR,
} from '../actionTypes';
import api from '../../services/apiService';
import { isSubmitedForm } from './formsActions';

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

export const articleFavoriteSuccess = (slug, isFavorite) => {
  return {
    type: ARTICLE_FAVORITE_SUCCESS,
    payload: { slug, isFavorite },
  };
};

export const articleFavoriteError = (slug, isFavorite) => {
  return {
    type: ARTICLE_FAVORITE_ERROR,
    payload: { slug, isFavorite },
  };
};

export const favoriteArticle = (slug, isFavorite) => (dispatch) => {
  const handlerFunc = isFavorite ? api.Articles.favorite : api.Articles.unfavorite;
  dispatch(articleFavoriteSuccess(slug, isFavorite));
  handlerFunc(slug).catch(() => dispatch(articleFavoriteError(slug, !isFavorite)));
};

export const loadArticles = (page) => (dispatch) => {
  dispatch(setArticlesLoadingError(false));
  dispatch(setArticlesLoaded(false));
  api.Articles.all(page)
    .then((res) => {
      dispatch(setArticles(res.articles));
      dispatch(setArticlesCount(res.articlesCount));
      dispatch(setArticlesLoaded(true));
    })
    .catch(() => {
      dispatch(setArticlesLoadingError(true));
    });
};

export const loadArticle = (slug) => (dispatch) => {
  dispatch(setArticlesLoadingError(false));
  dispatch(setArticlesLoaded(false));
  api.Articles.get(slug)
    .then((res) => {
      dispatch(setArticles([res.article]));
      dispatch(setArticlesCount(1));
      dispatch(setArticlesLoaded(true));
    })
    .catch(() => {
      dispatch(setArticlesLoadingError(true));
    });
};

export const updateArticle = (article) => (dispatch) => {
  dispatch(isSubmitedForm(true));
  return api.Articles.update(article).finally(() => dispatch(isSubmitedForm(false)));
};

export const createArticle = (article) => (dispatch) => {
  dispatch(isSubmitedForm(true));
  return api.Articles.create(article).finally(() => dispatch(isSubmitedForm(false)));
};

export const delArticle = (slug) => (dispatch) => {
  dispatch(isSubmitedForm(true));
  return api.Articles.del(slug).finally(() => dispatch(isSubmitedForm(false)));
};
