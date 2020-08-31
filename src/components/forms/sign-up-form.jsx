import { Form, Divider, Checkbox, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { useHistory, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import cls from './forms.module.scss';
import { register } from '../../redux/actions/userSessionActions';
import {
  renderInputText,
  renderInputPassword,
  USERNAME_VALIDATE_PATTERN,
  EMAIL_VALIDATE_PATTERN,
  PASSWORD_VALIDATE_PATTERN,
} from './forms';

const validateRepeatedPassword = ({ getFieldValue }) => ({
  validator(rules, value) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return getFieldValue('password') === value ? Promise.resolve() : Promise.reject('Passwords must match');
  },
});

export default function SignUpForm() {
  const [isPolicyAdopted, setIsPolicyAdopted] = useState(true);
  const isSubmited = useSelector((state) => state.forms.isSubmited);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(register(username, email, password))
      .then(() => {
        message.success('Account created successfully', 3);
        form.resetFields();
        history.goBack();
      })
      .catch((err) => {
        form.setFields(
          Object.entries(err).map(([field, errors]) => {
            return { name: field, errors };
          })
        );
      });
  };

  const onChangePolicyCheckbox = (evt) => {
    setIsPolicyAdopted(evt.target.checked);
  };

  return (
    <Form form={form} onFinish={onSubmit} className={cn(cls.container, cls.narrow)}>
      <h5 className={cls.title}>Create new account</h5>
      {renderInputText({
        name: 'username',
        label: 'Username',
        placeholder: 'Username',
        rules: [
          {
            required: true,
            pattern: USERNAME_VALIDATE_PATTERN,
            message: 'Username must be between 3 and 20 characters',
          },
        ],
      })}
      {renderInputText({
        name: 'email',
        label: 'Email adress',
        placeholder: 'Email',
        rules: [
          {
            required: true,
            pattern: EMAIL_VALIDATE_PATTERN,
            message: 'Email address must be correct',
          },
        ],
      })}
      {renderInputPassword({
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        rules: [
          {
            required: true,
            pattern: PASSWORD_VALIDATE_PATTERN,
            message: 'Your password needs to be at least 6 characters',
          },
        ],
      })}
      {renderInputPassword({
        name: 'confirm',
        label: 'Repeate password',
        placeholder: 'Password',
        dependencies: ['password'],
        rules: [{ required: true, message: 'Please, confirm your password' }, validateRepeatedPassword],
      })}
      <Divider className={cls.divider} />
      <Form.Item>
        <Checkbox checked={isPolicyAdopted} onChange={onChangePolicyCheckbox}>
          I agree to the processing of my personal information
        </Checkbox>
      </Form.Item>
      <Button className={cls.submit} type="primary" htmlType="submit" disabled={!isPolicyAdopted || isSubmited}>
        Create
      </Button>
      <p className={cls.text}>
        Already have an account?{' '}
        <Link className={cls.link} to="/sign-in/">
          Sign In.
        </Link>
      </p>
    </Form>
  );
}
