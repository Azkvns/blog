import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Tag, Button, Popconfirm } from 'antd';
import cls from './article.module.scss';
import avatar from '../../resources/images/avatar.svg';
import * as articlesActions from '../../redux/actions/articlesActions';
import Like from '../like';
import { articles } from '../../routing/routes';

const renderTags = (tags) => {
  return tags.map((tag) => (
    <Tag key={tag} className={cls.tag}>
      {tag}
    </Tag>
  ));
};

const renderDate = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(
    Date.parse(timestamp)
  );
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

const renderArticle = (article, body, props) => {
  const { slug, title, description, tagList, createdAt, author, favorited, favoritesCount } = article;
  const { username, image } = author;
  const { onFavorite, onArticleDelete, onArticleEdit, isEditable } = props;

  return (
    <article className={cls.container}>
      <div className={cls.header}>
        <div className={cls.articleInfo}>
          <div className={cls.titleWrapper}>
            <h5 className={cls.title}>
              <Link className={cls.link} to={articles.bySlug(slug)}>
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
            <img className={image} src={image || avatar} width="46" alt="Person avatar" />
          </div>
          {isEditable &&
            renderControlBtns(
              () => onArticleDelete(slug),
              () => onArticleEdit(slug)
            )}
        </div>
      </div>
      <ReactMarkdown source={body} />
    </article>
  );
};

export function Article(props) {
  const { article } = props;
  const { isLogged, username } = useSelector((state) => state.userSession);
  const isEditable = username === article.author.username;
  const dispatch = useDispatch();
  const history = useHistory();
  const onArticleDelete = (slug) => {
    dispatch(articlesActions.delArticle(slug));
    history.push(articles.all());
  };
  const onArticleEdit = (slug) => {
    history.push(articles.edit(slug));
  };
  const onFavorite = (slug, isChecked) => {
    dispatch(articlesActions.favoriteArticle(slug, isChecked));
  };
  return renderArticle(article, article.body, { onFavorite, onArticleDelete, onArticleEdit, isLogged, isEditable });
}

export function ArticlePreview(props) {
  const { article } = props;
  const { isLogged } = useSelector((state) => state.userSession);
  const dispatch = useDispatch();
  const onFavorite = (slug, isChecked) => {
    dispatch(articlesActions.favoriteArticle(slug, isChecked));
  };
  return renderArticle(article, '', { onFavorite, isLogged });
}
