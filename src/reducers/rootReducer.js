import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import articleReducer from './articleReducer';
import userSessionReducer from './userSessionReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  userSession: userSessionReducer,
});

export default rootReducer;
