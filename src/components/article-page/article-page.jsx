import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin, Result } from 'antd';
import { Article } from '../article';
import { loadArticle } from '../../redux/actions/articlesActions';
import cls from './article-page.module.scss';

const renderSpinner = () => {
  return (
    <div className={cls.spinnerContainer}>
      <Spin size="large" />
    </div>
  );
};

const ArticlePage = () => {
  const { slug } = useParams();
  const { loaded, loadingError } = useSelector((state) => state.articles);
  const article = useSelector((state) => state.articles.articles.find((item) => item.slug === slug));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!article) {
      dispatch(loadArticle(slug));
    }
  }, [slug, dispatch, article]);

  if (loadingError) {
    return <Result status="error" title="Oops, something went wrong" />;
  }
  return loaded ? <Article article={article} /> : renderSpinner();
};

export default ArticlePage;
