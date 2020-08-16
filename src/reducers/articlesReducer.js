import { SET_ARTICLES, SET_ARTICLES_COUNT, SET_PAGE, SET_ARTICLES_IS_LOADED } from '../types';

export default function ArticlesReducer(
  state = { page: 1, articles: [], articlesCount: 0, articlesIsLoaded: false },
  action
) {
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_ARTICLES_COUNT:
      return { ...state, articlesCount: action.payload };
    case SET_ARTICLES_IS_LOADED:
      return { ...state, articlesIsLoaded: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
