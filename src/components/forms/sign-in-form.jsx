import { Form, Button, message } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import cls from './forms.module.scss';
import { renderInputText, renderInputPassword, EMAIL_VALIDATE_PATTERN } from './forms';
import { login } from '../../redux/actions/userSessionActions';
import * as routes from '../../routing/routes';

export default function SignInForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSubmited = useSelector((state) => state.forms.isSubmited);
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password))
      .then(() => {
        message.success('You are successfully logged in', 3);
        history.push(routes.articles.all());
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
      <Button className={cls.submit} type="primary" htmlType="submit" disabled={isSubmited}>
        Login
      </Button>
      <p className={cls.text}>
        Don&apos;t have an account?
        <Link className={cls.link} to={routes.user.create()}>
          {' '}
          Sign Up.
        </Link>
      </p>
    </Form>
  );
}
