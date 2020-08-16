import { SET_ARTICLE, SET_ARTICLE_IS_LOADED, REMOVE_ARTICLE } from '../types';

export default function articleReducer(state = { articleIsLoaded: false }, action) {
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, ...action.payload };
    case SET_ARTICLE_IS_LOADED:
      return { ...state, articleIsLoaded: action.payload };
    case REMOVE_ARTICLE:
      return { articleIsLoaded: false };
    default:
      return state;
  }
}
