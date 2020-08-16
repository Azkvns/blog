import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import cls from './article.module.scss';
import avatar from '../../images/avatar.svg';
import { removeArticle } from '../../actions/articleActions';

const renderTags = (tags) => {
  return tags.map((tag) => (
    <div key={tag} className={cls.tag}>
      {tag}
    </div>
  ));
};

const renderDate = (timestamp) => {
  return format(Date.parse(timestamp), 'MMMM d, yyyy');
};

const renderArticle = (article, body) => {
  const { slug, title, description, tagList, createdAt, author } = article;
  const { username, image } = author;
  return (
    <article className={cls.container}>
      <div className={cls.header}>
        <div className={cls.articleInfo}>
          <div className={cls.titleWrapper}>
            <h5 className={cls.title}>
              <Link className={cls.link} to={`/article/${slug}`}>
                {title}
              </Link>
            </h5>
          </div>
          <div className={cls.tagList}>{renderTags(tagList)}</div>
          <p className={cls.text}>{description}</p>
        </div>
        <div className={cls.person}>
          <div className={cls.personInfo}>
            <span className={cls.name}>{username}</span>
            <time className={cls.time}>{renderDate(createdAt)}</time>
          </div>
          <img className={image} src={avatar} width="46" alt="Person avatar" />
        </div>
      </div>
      <ReactMarkdown source={body} />
    </article>
  );
};

export function Article() {
  const { article } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(removeArticle());
    };
  }, [dispatch]);
  if (article.articleIsLoaded) {
    return renderArticle(article, article.body);
  }
  return <div />;
}

export function ArticlePreview(props) {
  const { article } = props;
  return renderArticle(article);
}

ArticlePreview.propTypes = {
  article: PropTypes.shape({}).isRequired,
};
