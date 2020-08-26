import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Pagination, Spin } from 'antd';
import { loadArticles } from '../../actions/articlesActions';
import cls from './articles-page.module.scss';
import { ArticlePreview } from '../article';
import './pagination.scss';

const renderArticles = (articles) => {
  return articles.map((article) => (
    <li className={cls.item} key={article.slug}>
      <ArticlePreview article={article} />
    </li>
  ));
};

const renderSpinner = () => {
  return (
    <div className={cls.spinnerContainer}>
      <Spin size="large" />
    </div>
  );
};

export default function ArticlesPage() {
  const { page } = useParams();
  const { articles, articlesCount, loading } = useSelector((state) => state.articles);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticles(Number(page)));
  }, [page, dispatch]);
  return (
    <div className={cls.container}>
      <ul className={cls.list}>{loading ? renderSpinner() : renderArticles(articles)}</ul>
      {!loading && (
        <Pagination
          current={Number(page)}
          total={Number(articlesCount)}
          showSizeChanger={false}
          onChange={(number) => {
            history.push(`/articles/${number}`);
          }}
        />
      )}
    </div>
  );
}
