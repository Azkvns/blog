import React from 'react';
import { Result } from 'antd';
import cls from './error-boundry.module.scss';

export default class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  renderError() {
    return (
      <div className={cls.container}>
        <Result status="error" title="Oops, Something Went Wrong" />
      </div>
    );
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    return hasError ? this.renderError() : children;
  }
}
