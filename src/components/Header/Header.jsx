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
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.moviesSearchQueryDebounce = debounce(this.moviesSearchQuery, 1000);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value });
    this.moviesSearchQueryDebounce();
  }

  moviesSearchQuery = () => {
    const { value } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.moviesSearchQuery(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="wrapper-header">
        <Input className="input-search" placeholder="Type to search" onChange={this.onChange} value={value} />
      </div>
    );
  }
}
