import cn from 'classnames';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import * as actions from '../../actions/userSessionActions';
import avatar from '../../images/avatar.svg';
import cls from './header.module.scss';
import agent from '../../agent';

// eslint-disable-next-line no-unused-vars
const renderNonAuthorizedBlock = () => {
  return (
    <>
      <Link className={cn(cls.btn, cls.signIn)} to="/sign-in/">
        Sign In
      </Link>
      <Link className={cn(cls.btn, cls.signUp)} to="/sign-up/">
        Sign Up
      </Link>
    </>
  );
};

const renderAuthorizedBlock = (username, logout) => {
  return (
    <>
      <Link className={cn(cls.btn, cls.createArticle)} to="/new-article/">
        Create articles
      </Link>
      <Link className={cls.person} to="/profile/">
        <span className={cls.name}>{username}</span>
        <img className={cls.avatar} src={avatar} alt="your avatar" />
      </Link>
      <Link className={cn(cls.btn, cls.signUp, cls.logOut)} to="/" onClick={logout}>
        Log Out
      </Link>
    </>
  );
};

export default function Header() {
  const { username } = useSelector((state) => state.userSession);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actions.removeUserSession());
    localStorage.removeItem('userSession');
    agent.setToken(null);
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
        {username ? renderAuthorizedBlock(username, logout) : renderNonAuthorizedBlock()}
      </div>
    </header>
  );
}
