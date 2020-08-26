import { SET_ARTICLE, SET_ARTICLE_LOADING, SET_ARTICLE_IS_FAVORITE, REMOVE_ARTICLE } from '../types';

const handleSetArticleIsFavorite = (article, value) => {
  const additional = value ? 1 : -1;
  return { favoritesCount: article.favoritesCount + additional, favorited: value };
};

export default function articleReducer(state = { loading: false }, action) {
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, ...action.payload };
    case SET_ARTICLE_LOADING:
      return { ...state, loading: action.payload };
    case SET_ARTICLE_IS_FAVORITE:
      return { ...state, ...handleSetArticleIsFavorite(state, action.payload) };
    case REMOVE_ARTICLE:
      return { loading: false };
    default:
      return state;
  }
}
