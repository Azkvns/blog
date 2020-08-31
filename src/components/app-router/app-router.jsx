import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './private-route';
import routerConfig from '../../routing/appRouterConfig';
import { articles } from '../../routing/routes';

const AppRouter = () => {
  return (
    <Switch>
      {routerConfig.map(({ path, Component, isPrivate }) =>
        isPrivate ? (
          <PrivateRoute path={path} exact key={path}>
            <Component />
          </PrivateRoute>
        ) : (
          <Route path={path} exact component={Component} key={path} />
        )
      )}
      <Redirect to={articles.all()} />
    </Switch>
  );
};

export default AppRouter;
