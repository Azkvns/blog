import {
  SET_ARTICLE,
  SET_ARTICLE_LOADED,
  SET_ARTICLE_IS_FAVORITE,
  REMOVE_ARTICLE,
  SET_ARTICLE_LOADING_ERROR,
} from '../types';

const handleSetArticleIsFavorite = (article, value) => {
  const additional = value ? 1 : -1;
  return { favoritesCount: article.favoritesCount + additional, favorited: value };
};

export default function articleReducer(state = { loaded: false, loadingError: false }, action) {
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, ...action.payload };
    case SET_ARTICLE_LOADED:
      return { ...state, loaded: action.payload };
    case SET_ARTICLE_LOADING_ERROR:
      return { ...state, loadingError: action.payload };
    case SET_ARTICLE_IS_FAVORITE:
      return { ...state, ...handleSetArticleIsFavorite(state, action.payload) };
    case REMOVE_ARTICLE:
      return { loading: false };
    default:
      return state;
  }
}
