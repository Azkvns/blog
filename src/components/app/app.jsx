import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArticlePage from '../article-page';
import ArticlesPage from '../articles-page';
import { SignUpForm, SignInForm, EditProfileForm, NewArticleForm, EditArticleForm } from '../forms';
import Header from '../header';
import cls from './app.module.scss';
import { setUserSession } from '../../actions/userSessionActions';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const userSession = localStorage.getItem('userSession');
      if (userSession) {
        dispatch(setUserSession(JSON.parse(userSession)));
      }
    } catch (err) {
      console.log('App -> err', err);
    }
  }, [dispatch]);
  return (
    <div className={cls.container}>
      <Header />
      <main className={cls.main}>
        <Switch>
          <Route exact path="/articles/page/:page" component={ArticlesPage} />
          <Route exact path="/articles/{slug}/edit" component={EditArticleForm} />
          <Route exact path="/articles/:slug" component={ArticlePage} />
          <Route exact path="/sign-up/" component={SignUpForm} />
          <Route exact path="/sign-in/" component={SignInForm} />
          <Route exact path="/profile/" component={EditProfileForm} />
          <Route exact path="/new-article/" component={NewArticleForm} />
          <Redirect exact from="/" to="articles/page/1" />
        </Switch>
      </main>
    </div>
  );
}
