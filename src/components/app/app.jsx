import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import cls from './app.module.scss';
import Header from '../header';
import ArticlesPage from '../articles-page';
import ArticlePage from '../article-page';

export default function App() {
  return (
    <div className={cls.container}>
      <Header />
      <main className={cls.main}>
        <Switch>
          <Route exact path="/articles/:page" component={ArticlesPage} />
          <Route exact path="/article/:slug" component={ArticlePage} />
          <Redirect exact from="/" to="articles/1" />
        </Switch>
      </main>
    </div>
  );
}
