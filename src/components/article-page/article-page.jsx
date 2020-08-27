import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin, Result } from 'antd';
import { Article } from '../article';
import { loadArticle } from '../../actions/articleActions';

const ArticlePage = () => {
  const { slug } = useParams();
  const { loaded, loadingError } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticle(slug));
  }, [slug, dispatch]);

  if (loadingError) {
    return <Result status="error" title="Oops, something went wrong" />;
  }
  return loaded ? <Article /> : <Spin />;
};

export default ArticlePage;
