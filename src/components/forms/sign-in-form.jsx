import { Form, Button, message } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import cls from './forms.module.scss';
import { renderInputText, renderInputPassword, EMAIL_VALIDATE_PATTERN } from './forms';
import { login } from '../../actions/userSessionActions';

export default function SignInForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password))
      .then(() => {
        message.success('You are successfully logged in', 3);
        history.push('/');
      })
      .catch((err) => {
        const error = err['email or password'];
        message.error('Login failed', 3);
        form.setFields([
          { name: 'email', errors: [error] },
          { name: 'password', errors: [error] },
        ]);
      });
  };

  return (
    <Form form={form} onFinish={onSubmit} className={cn(cls.container, cls.narrow)}>
      <h5 className={cls.title}>Sign In</h5>
      {renderInputText({
        name: 'email',
        label: 'Email adress',
        placeholder: 'Email adress',
        rules: [{ required: true, pattern: EMAIL_VALIDATE_PATTERN, message: 'Email address must be correct' }],
      })}
      {renderInputPassword({
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        rules: [{ required: true, pattern: /.+/, message: 'Password field must not be empty' }],
      })}
      <Button className={cls.submit} type="primary" htmlType="submit">
        Login
      </Button>
      <p className={cls.text}>
        Don&apos;t have an account?
        <Link className={cls.link} to="/sign-up/">
          {' '}
          Sign Up.
        </Link>
      </p>
    </Form>
  );
}
