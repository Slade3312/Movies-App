import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './Header.css';

export default class Header extends Component {
  static propTypes = {
    moviesSearchQuery: PropTypes.func.isRequired,
  };

  state = {
    value: null,
  };

  constructor(props) {
    super(props);
    this.moviesSearchQueryDebounce = debounce(this.moviesSearchQuery, 1000);
  }

  onChange = (value) => {
    this.setState({ value });
    this.moviesSearchQueryDebounce();
  };

  moviesSearchQuery = () => {
    const { value } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.moviesSearchQuery(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="wrapper-header">
        <Input placeholder="Type to search" onChange={(event) => this.onChange(event.target.value)} value={value} />
      </div>
    );
  }
}
