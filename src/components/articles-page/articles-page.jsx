import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';
import { loadArticles } from '../../actions/articlesActions';
import cls from './articles-page.module.scss';
import { ArticlePreview } from '../article';
import Pagination from '../pagination';

const renderArticles = (articles) => {
  return articles.map((article) => (
    <li className={cls.item} key={article.slug}>
      <ArticlePreview article={article} />
    </li>
  ));
};

export default function ArticlesPage() {
  const { page } = useParams();
  const { articles, articlesCount, articlesIsLoaded } = useSelector((state) => state.articles);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticles(Number(page)));
  }, [page, dispatch]);
  return (
    <div className={cls.container}>
      <ul className={cn(cls.list, { [cls.disabledList]: !articlesIsLoaded })}>{renderArticles(articles)}</ul>
      <Pagination
        current={Number(page)}
        pageSize={10}
        total={Number(articlesCount)}
        onChange={(number) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          history.push(`/articles/${number}`);
        }}
      />
    </div>
  );
}
