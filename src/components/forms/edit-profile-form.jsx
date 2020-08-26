import { Form, Button, notification } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import cn from 'classnames';
import cls from './forms.module.scss';
import agent from '../../agent';
import {
  renderInputText,
  renderInputPassword,
  EMAIL_VALIDATE_PATTERN,
  PASSWORD_VALIDATE_PATTERN,
  URL_VALIDATE_PATTERN,
} from './forms';

export default function EditProfileForm() {
  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    agent.Auth.save({ username, email, password, image })
      .then(() => notification.success({ message: 'The data was saved successfully' }))
      .catch(() => notification.error({ message: 'An error occurred while saving' }));
  };
  return (
    <Form onFinish={onSubmit} className={cn(cls.container, cls.narrow)}>
      <h5 className={cls.title}>Edit Profile</h5>
      {renderInputText({
        name: 'username',
        label: 'Username',
        placeholder: 'Username',
        rules: [{ required: true, pattern: /.+/, message: 'Username field must not be empty' }],
      })}
      {renderInputText({
        name: 'email',
        label: 'Email adress',
        placeholder: 'Email adress',
        rules: [{ required: true, pattern: EMAIL_VALIDATE_PATTERN, message: 'Email address must be correct' }],
      })}
      {renderInputPassword({
        name: 'password',
        label: 'New password',
        placeholder: 'New password',
        rules: [
          {
            pattern: PASSWORD_VALIDATE_PATTERN,
            message: 'Your password needs to be at least 6 characters',
          },
        ],
      })}
      {renderInputText({
        name: 'image',
        label: 'Avatar image (url)',
        placeholder: 'Avatar image',
        rules: [{ pattern: URL_VALIDATE_PATTERN, message: 'Image utl must be correct' }],
      })}
      <Button className={cls.submit} type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
}
