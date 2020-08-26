import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Tag, Button, Popconfirm } from 'antd';
import cls from './article.module.scss';
import avatar from '../../images/avatar.svg';
import * as articleActions from '../../actions/articleActions';
import * as articlesActions from '../../actions/articlesActions';
import Like from '../like';
import agent from '../../agent';

const renderTags = (tags) => {
  return tags.map((tag) => (
    <Tag key={tag} className={cls.tag}>
      {tag}
    </Tag>
  ));
};

const renderDate = (timestamp) => {
  return format(Date.parse(timestamp), 'MMMM d, yyyy');
};

const renderControlBtns = (onArticleDelete, onArticleEdit) => {
  return (
    <div className={cls.controlBtns}>
      <Popconfirm
        placement="rightTop"
        title="Are you sure delete this article?"
        onConfirm={onArticleDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button className={cls.delete} danger>
          Delete
        </Button>
      </Popconfirm>
      <Button onClick={onArticleEdit} className={cls.edit}>
        Edit
      </Button>
    </div>
  );
};

const renderArticle = (article, body, onFavorite, onArticleDelete, onArticleEdit, isEditable) => {
  const { slug, title, description, tagList, createdAt, author, favorited, favoritesCount } = article;
  const { username, image } = author;

  return (
    <article className={cls.container}>
      <div className={cls.header}>
        <div className={cls.articleInfo}>
          <div className={cls.titleWrapper}>
            <h5 className={cls.title}>
              <Link className={cls.link} to={`/articles/${slug}`}>
                {title}
              </Link>
            </h5>
            <Like counter={favoritesCount} checked={favorited} onChange={(isChecked) => onFavorite(slug, isChecked)} />
          </div>
          <div className={cls.tagList}>{renderTags(tagList)}</div>
          <p className={cls.text}>{description}</p>
        </div>
        <div className={cls.person}>
          <div className={cls.top}>
            <div className={cls.personInfo}>
              <span className={cls.name}>{username}</span>
              <time className={cls.time}>{renderDate(createdAt)}</time>
            </div>
            <img className={image} src={avatar} width="46" alt="Person avatar" />
          </div>
          {body && isEditable && renderControlBtns(onArticleDelete, onArticleEdit)}
        </div>
      </div>
      <ReactMarkdown source={body} />
    </article>
  );
};

export function Article() {
  const { isLogged, username } = useSelector((state) => state.userSession);
  const article = useSelector((state) => state.article);
  const isEditable = username === article.author.username;
  const dispatch = useDispatch();

  // const onArticleDelete = (slug) => {
  //   agent.Articles.del(slug).dispatch();
  // };

  const onFavorite = (slug, isChecked) => {
    dispatch(articleActions.setArticleIsFavorite(slug, isChecked));
  };
  useEffect(() => {
    return () => {
      dispatch(articleActions.removeArticle());
    };
  }, [dispatch]);
  return renderArticle(article, article.body, onFavorite, isLogged, isEditable);
}

export function ArticlePreview(props) {
  const { article } = props;
  const { isLogged } = useSelector((state) => state.userSession);
  const dispatch = useDispatch();
  const onFavorite = (slug, isChecked) => {
    dispatch(articlesActions.setArticleIsFavorite(slug, isChecked));
  };
  return renderArticle(article, '', onFavorite, isLogged);
}

Article.defaultProps = {};

Article.propTypes = {
  article: PropTypes.shape({}).isRequired,
};
