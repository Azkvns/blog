import { Form, Button, Input, message } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { loadArticle } from '../../actions/articleActions';
import agent from '../../agent';
import cls from './forms.module.scss';
import { renderInputText, renderTextArea } from './forms';

const renderArticleForm = (form, onSubmit, title, initialValues) => {
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
      <Button className={cls.submit} type="primary" htmlType="submit">
        Send
      </Button>
    </Form>
  );
};

export const NewArticleForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const isLogged = useSelector((state) => state.userSession.isLogged);
  const onSubmit = (data) => {
    agent.Articles.create(data)
      .then(() => {
        message.success('You are successfully create article', 3);
        history.push('/');
      })
      .catch((err) => {
        form.setFields(
          Object.entries(err).map(([field, errors]) => {
            return { name: field, errors };
          })
        );
        message.error('Creating failed', 3);
      });
  };
  return isLogged ? (
    renderArticleForm(form, onSubmit, 'Create new article', { tagList: [''] })
  ) : (
    <Redirect to="/sign-in/" />
  );
};

export const EditArticleForm = () => {
  const { slug } = useParams();
  const history = useHistory();
  const article = useSelector((state) => state.article);
  const isLogged = useSelector((state) => state.userSession.isLogged);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticle(slug));
  }, [dispatch, slug]);
  const onSubmit = (data) => {
    const { title, description, body, tagList } = data;
    agent.Articles.update({
      ...article,
      title,
      description,
      body,
      tagList,
    })
      .then(() => {
        message.success('You are successfully edit article', 3);
        history.push('/');
      })
      .catch((err) => {
        form.setFields(
          Object.entries(err).map(([field, errors]) => {
            return { name: field, errors };
          })
        );
        message.error('Editing failed', 3);
      });
  };
  return isLogged ? renderArticleForm(form, onSubmit, 'Edit article', article) : <Redirect to="/sign-in/" />;
};
