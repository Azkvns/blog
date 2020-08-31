import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { logout } from '../../redux/actions/userSessionActions';
import avatar from '../../resources/images/avatar.svg';
import cls from './header.module.scss';
import * as routes from '../../routing/routes';

// eslint-disable-next-line no-unused-vars
const renderNonAuthorizedBlock = () => {
  return (
    <>
      <Link className={cn(cls.btn, cls.signIn)} to={routes.auth.login()}>
        Sign In
      </Link>
      <Link className={cn(cls.btn, cls.signUp)} to={routes.user.create()}>
        Sign Up
      </Link>
    </>
  );
};

const renderAuthorizedBlock = (user, onLogout) => {
  const { username, image } = user;
  return (
    <>
      <Link className={cn(cls.btn, cls.createArticle)} to={routes.articles.create()}>
        Create articles
      </Link>
      <Link className={cls.person} to={routes.user.edit()}>
        <span className={cls.name}>{username}</span>
        <img className={cls.avatar} src={image || avatar} alt="your avatar" />
      </Link>
      <Link className={cn(cls.btn, cls.signUp, cls.logOut)} to={routes.articles.all()} onClick={onLogout}>
        Log Out
      </Link>
    </>
  );
};

export default function Header() {
  const user = useSelector((state) => state.userSession);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    message.info('you are logged out', 3);
  };
  return (
    <header className={cls.container}>
      <h1 className={cls.title}>
        <Link className={cls.link} to="/">
          Realworld Blog
        </Link>
      </h1>
      <div className={cls.rightBlock}>
        {user.isLogged ? renderAuthorizedBlock(user, onLogout) : renderNonAuthorizedBlock()}
      </div>
    </header>
  );
}
