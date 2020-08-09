import React, { Component } from 'react';
import { Row, Col, Spin, Alert, Pagination } from 'antd';
import './MoviesList.css';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';

export default class MoviesList extends Component {
  static propTypes = {
    searchValue: PropTypes.string,
    getDataMovies: PropTypes.func.isRequired,
    sessionId: PropTypes.string,
    activeTab: PropTypes.string,
  };

  static defaultProps = {
    sessionId: null,
    searchValue: null,
    activeTab: 1,
  };

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
    const { searchValue: search, sessionId } = this.props;

    this.updateMovies({ page, search, sessionId });
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchValue: search, sessionId, activeTab } = this.props;
    if ((page !== prevState.page || search !== prevProps.searchValue) && search !== '') {
      this.updateMovies({ page, search, sessionId });
    }
    if (activeTab === '2' && prevProps.activeTab !== '2') {
      this.updateMovies({ page, search, sessionId });
    }
  }

  onChange = (event) => {
    this.setState({
      page: event,
      loading: true,
    });
  };

  updateMovies(options) {
    const { getDataMovies } = this.props;
    getDataMovies(options)
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
    const { sessionId } = this.props;
    let elements;
    if (movies) {
      elements = movies.map((movie) => {
        const { id } = movie;
        return (
          <Col className="gutter-row" span={12} key={id}>
            <MovieCard {...movie} sessionId={sessionId} />
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
    const alert = error ? (
      <Alert message="Error" description={`${errMessage}, please try to reload the site`} type="error" />
    ) : null;
    const notMovies =
      hasData && movies.length === 0 ? <Alert message="No results were found for your search." type="info" /> : null;

    return (
      <div className="wrapper-card-list">
        {spinner}
        {notMovies}
        {content}
        {alert}
      </div>
    );
  }
}
