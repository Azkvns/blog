import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({ articles: articlesReducer, article: articleReducer });

export default rootReducer;
