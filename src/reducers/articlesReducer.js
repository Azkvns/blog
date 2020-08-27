import {
  SET_ARTICLES,
  SET_ARTICLES_COUNT,
  SET_PAGE,
  SET_ARTICLES_LOADED,
  SET_ARTICLE_IS_FAVORITE,
  SET_ARTICLES_LOADING_ERROR,
} from '../types';

const handleSetArticleIsFavorite = (articles, payload) => {
  const { slug, value } = payload;
  return articles.map((article) => {
    if (article.slug === slug) {
      const additional = value ? 1 : -1;
      return { ...article, favorited: value, favoritesCount: article.favoritesCount + additional };
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
    case SET_ARTICLE_IS_FAVORITE:
      return { ...state, articles: handleSetArticleIsFavorite(state.articles, action.payload) };
    default:
      return state;
  }
}
