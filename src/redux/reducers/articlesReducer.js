import {
  SET_ARTICLES,
  SET_ARTICLES_COUNT,
  SET_PAGE,
  SET_ARTICLES_LOADED,
  ARTICLE_FAVORITE_SUCCESS,
  ARTICLE_FAVORITE_ERROR,
  SET_ARTICLES_LOADING_ERROR,
} from '../actionTypes';

const handleSetArticleIsFavorite = (articles, slug, isFavorite) => {
  return articles.map((article) => {
    if (article.slug === slug) {
      const additional = isFavorite ? 1 : -1;
      return { ...article, favorited: isFavorite, favoritesCount: article.favoritesCount + additional };
    }
    return article;
  });
};

export default function ArticlesReducer(state = { page: 1, articles: [], articlesCount: 0, loaded: false }, action) {
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_ARTICLES_COUNT:
      return { ...state, articlesCount: action.payload };
    case SET_ARTICLES_LOADED:
      return { ...state, loaded: action.payload };
    case SET_ARTICLES_LOADING_ERROR:
      return { ...state, loadingError: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case ARTICLE_FAVORITE_SUCCESS:
    case ARTICLE_FAVORITE_ERROR:
      return {
        ...state,
        articles: handleSetArticleIsFavorite(state.articles, action.payload.slug, action.payload.isFavorite),
      };
    default:
      return state;
  }
}
