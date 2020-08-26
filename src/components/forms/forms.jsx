import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import cls from './forms.module.scss';

export const EMAIL_VALIDATE_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const PASSWORD_VALIDATE_PATTERN = /^[a-zA-Z0-9_-]{8,40}$/;
export const USERNAME_VALIDATE_PATTERN = /^[a-zA-Z0-9_-]{3,20}$/;
export const URL_VALIDATE_PATTERN = /[-a-zA-Z0-9@:%_\\+.~#?&\\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\\+.~#?&\\/=]*)?/gi;

const renderComponent = (component, props) => {
  const { name, label, rules, dependencies, hasFeedback } = props;
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <Form.Item
        rules={rules}
        name={name}
        className={cls.formItem}
        dependencies={dependencies}
        hasFeedback={hasFeedback}
      >
        {component}
      </Form.Item>
    </div>
  );
};

export const renderInputText = (props) => {
  return renderComponent(
    <Input placeholder={props.placeholder} className={cls.input} defaultValue={props.value} />,
    props
  );
};
export const renderInputPassword = (props) => {
  return renderComponent(<Input.Password placeholder={props.placeholder} className={cls.input} />, props);
};
export const renderTextArea = (props) => {
  return renderComponent(<Input.TextArea placeholder={props.placeholder} className={cls.textArea} />, props);
};
