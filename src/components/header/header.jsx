import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import cls from './header.module.scss';
import avatar from '../../images/avatar.svg';

// eslint-disable-next-line no-unused-vars
const renderNonAuthorizedBlock = () => {
  return (
    <>
      <button className={cn(cls.btn, cls.signIn)} type="button">
        Sign In
      </button>
      <button className={cn(cls.btn, cls.signUp)} type="button">
        Sign Up
      </button>
    </>
  );
};

const renderAuthorizedBlock = () => {
  return (
    <>
      <button className={cn(cls.btn, cls.createArticle)} type="button">
        Create articles
      </button>
      <div className={cls.person}>
        <span className={cls.name}>John Doe</span>
        <img className={cls.avatar} src={avatar} alt="your avatar" />
      </div>
      <button className={cn(cls.btn, cls.signUp, cls.logOut)} type="button">
        Log Out
      </button>
    </>
  );
};

export default function Header() {
  return (
    <header className={cls.container}>
      <h1 className={cls.title}>
        <Link className={cls.link} to="/">
          Realworld Blog
        </Link>
      </h1>
      <div className={cls.rightBlock}>{renderAuthorizedBlock()}</div>
    </header>
  );
}
