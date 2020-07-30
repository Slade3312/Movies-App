import React, { Component } from 'react';
import { Row, Col, Spin, Alert, Pagination } from 'antd';
import './MoviesList.css';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import MovieDBServices from '../../services/MovieDBServices';

export default class MoviesList extends Component {
  static propTypes = {
    searchValue: PropTypes.string.isRequired,
  };

  movieDBServices = new MovieDBServices();

  state = {
    movies: null,
    loading: true,
    error: false,
    errMessage: null,
    page: 1,
    totalPages: null,
  };

  componentDidMount() {
    const { page } = this.state;
    const { searchValue } = this.props;
    this.updateState(page, searchValue);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchValue } = this.props;
    //! условие говнокод!
    if ((page !== prevState.page || searchValue !== prevProps.searchValue) && searchValue !== '') {
      this.updateState(page, searchValue);
    }
  }

  onChange = (event) => {
    this.setState({
      page: event,
      loading: true,
    });
  };

  updateState(page, searchValue) {
    //! Название получше!
    this.movieDBServices
      .getMovies(page, searchValue)
      .then(({ movies, totalPages }) => {
        this.setState({
          movies,
          loading: false,
          totalPages,
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          loading: false,
          errMessage: err.message,
        });
      });
  }

  render() {
    const { movies, loading, error, errMessage, page, totalPages } = this.state;
    let elements;
    if (movies) {
      elements = movies.map((movie) => {
        const { id, ...items } = movie;
        return (
          <Col className="gutter-row" span={12} key={id}>
            <MovieCard movie={items} />
          </Col>
        );
      });
    }

    const pagination = (
      <Pagination
        onChange={(event) => this.onChange(event)}
        size="small"
        total={totalPages}
        defaultPageSize
        showSizeChanger={false}
        defaultCurrent={page}
      />
    );
    const hasData = !(loading || error);
    const spinner = loading ? <Spin tip="Loading..." /> : null;
    const content = hasData ? (
      <>
        <Row gutter={[37, 37]}>{elements}</Row>
        {pagination}
      </>
    ) : null;
    const alert = error ? <Alert message="Error" description={errMessage} type="error" /> : null;

    return (
      <div className="wrapper-card-list">
        {spinner}
        {content}
        {alert}
      </div>
    );
  }
}
