import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../header';
import cls from './app.module.scss';
import { loadLocalSession } from '../../redux/actions/userSessionActions';
import AppRouter from '../app-router';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalSession());
  }, [dispatch]);
  return (
    <div className={cls.container}>
      <Header />
      <main className={cls.main}>
        <AppRouter />
      </main>
    </div>
  );
}
