import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Article } from '../article';
import { loadArticle } from '../../actions/articleActions';

const ArticlePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticle(slug));
  }, [slug, dispatch]);

  return <Article />;
};

export default ArticlePage;
