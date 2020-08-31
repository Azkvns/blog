import ArticlePage from '../components/article-page';
import HomePage from '../components/home-page';
import { SignUpForm, SignInForm, EditProfileForm, ArticleForm } from '../components/forms';

import { articles, user, auth } from './routes';

const routerConfig = [
  {
    path: articles.all(),
    Component: HomePage,
  },
  {
    path: articles.bySlug(':slug'),
    Component: ArticlePage,
  },
  {
    path: articles.edit(':slug'),
    Component: ArticleForm,
    isPrivate: true,
  },
  {
    path: articles.create(),
    Component: ArticleForm,
    isPrivate: true,
  },
  {
    path: user.edit(),
    Component: EditProfileForm,
    isPrivate: true,
  },
  {
    path: user.create(),
    Component: SignUpForm,
  },
  {
    path: auth.login(),
    Component: SignInForm,
  },
];

export default routerConfig;
