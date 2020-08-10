/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    hasError: false,
    errMessage: null,
  };

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      errMessage: error,
    });
  }

  render() {
    if (this.state.hasError) {
      const { errMessage } = this.state;
      return <Alert message="Error" description={errMessage} type="error" />;
    }
    return this.props.children;
  }
}
