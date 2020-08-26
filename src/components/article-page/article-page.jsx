import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Article } from '../article';
import { loadArticle } from '../../actions/articleActions';

const ArticlePage = () => {
  const { slug } = useParams();
  const title = useSelector((state) => state.article.title);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticle(slug));
  }, [slug, dispatch]);

  return title ? <Article /> : '';
};

export default ArticlePage;
