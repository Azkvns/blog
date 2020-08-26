import { Form, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import agent from '../../agent';
import cls from './forms.module.scss';
import { renderInputText, renderTextArea } from './forms';

const renderArticleForm = (onSubmit, title, initialValues) => {
  return (
    <Form onFinish={onSubmit} initialValues={initialValues} className={cn(cls.container, cls.wide)}>
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
  const onSubmit = (data) => {
    agent.Articles.create(data);
  };
  return renderArticleForm(onSubmit, 'Create new article', { tagList: [''] });
};

export const EditArticleForm = () => {
  const { slug } = useParams();
  const article = useSelector((state) => state.article);
  const onSubmit = (data) => {
    const { title, description, body, tagList } = data;
    agent.Articles.create({
      article: {
        ...article,
        title,
        description,
        body,
        tagList,
      },
    });
  };
  return slug === article.slug && renderArticleForm(onSubmit, 'Edit article', article);
};
