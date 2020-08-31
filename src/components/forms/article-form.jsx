import { Form, Button, Input, message } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { updateArticle, loadArticle, createArticle } from '../../redux/actions/articlesActions';
import cls from './forms.module.scss';
import { renderInputText, renderTextArea } from './forms';

const renderArticleForm = (form, onSubmit, title, initialValues, isSubmited) => {
  return (
    <Form form={form} onFinish={onSubmit} initialValues={initialValues} className={cn(cls.container, cls.wide)}>
      <h5 className={cls.title}>{title}</h5>
      {renderInputText({
        name: 'title',
        label: 'Title',
        placeholder: 'Title',
        rules: [{ required: true }],
      })}
      {renderInputText({
        name: 'description',
        label: 'Short description',
        placeholder: 'Title',
        rules: [{ required: true }],
      })}
      {renderTextArea({
        name: 'body',
        label: 'Text',
        placeholder: 'Text',
        rules: [{ required: true }],
      })}
      <Form.List name="tagList">
        {(fields, { add, remove }) => {
          return (
            <div className={cls.tags}>
              <fieldset className={cls.fieldset}>
                <legend className={cls.legend}>Tags</legend>
                {fields.map((field) => (
                  <div className={cls.tag} key={field.key}>
                    <Form.Item className={cls.inputWrapper} {...field}>
                      <Input className={cls.input} placeholder="Tag" />
                    </Form.Item>
                    <Button className={cls.btn} danger onClick={() => remove(field.key)}>
                      Delete
                    </Button>
                  </div>
                ))}
              </fieldset>
              <div className={cls.right}>
                <Button className={cn(cls.btn, cls.addField)} onClick={() => add()} block>
                  Add tag
                </Button>
              </div>
            </div>
          );
        }}
      </Form.List>
      <Button className={cls.submit} type="primary" htmlType="submit" disabled={isSubmited}>
        Send
      </Button>
    </Form>
  );
};

const onSubmit = (dispatch, form, history) => (action) => {
  dispatch(action)
    .then(() => {
      message.success('Success', 3);
      history.goBack();
    })
    .catch((err) => {
      form.setFields(
        Object.entries(err).map(([field, errors]) => {
          return { name: field, errors };
        })
      );
      message.error('Fail', 3);
    });
};

const ArticleForm = () => {
  const history = useHistory();
  const { slug } = useParams();
  const article = useSelector((state) => state.articles.articles.find((item) => item.slug === slug));
  const isSubmited = useSelector((state) => state.forms.isSubmited);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onSubmitForm = useCallback((action) => onSubmit(dispatch, form, history)(action), [dispatch, form]);
  const onCreateArticle = (data) => onSubmitForm(createArticle(data));
  const onEditArticle = (data) => onSubmitForm(updateArticle({ ...article, ...data, slug }));
  useEffect(() => {
    if (slug) {
      dispatch(loadArticle(slug));
    }
  }, [dispatch, slug]);

  return slug
    ? renderArticleForm(form, onEditArticle, 'Edit article', article, isSubmited)
    : renderArticleForm(form, onCreateArticle, 'Create new article', null, isSubmited);
};

export default ArticleForm;
