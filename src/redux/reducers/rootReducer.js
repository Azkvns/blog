import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import userSessionReducer from './userSessionReducer';
import formsReducer from './formsReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  userSession: userSessionReducer,
  forms: formsReducer,
});

export default rootReducer;
