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
    activeTab: 'active_search',
  };

  state = {
    movies: null,
    loading: true,
    error: false,
    errMessage: null,
    page: 1,
    totalPages: null,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

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
    if (activeTab === 'active_rated' && prevProps.activeTab !== 'active_rated') {
      this.updateMovies({ page, search, sessionId });
    }
  }

  onChange(event) {
    this.setState({
      page: event,
      loading: true,
    });
  }

  updateMovies(options) {
    this.setState({ loading: true });
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
    const { sessionId, activeTab } = this.props;
    let elements;
    if (movies) {
      elements = movies.map((movie) => {
        const { id } = movie;
        return (
          <Col className="gutter-row" span={24} key={id} flex="387px" lg={12}>
            <MovieCard {...movie} sessionId={sessionId} activeTab={activeTab} />
          </Col>
        );
      });
    }

    const pagination = (
      <Pagination
        onChange={this.onChange}
        size="small"
        total={totalPages}
        defaultPageSize
        showSizeChanger={false}
        defaultCurrent={page}
      />
    );
    const hasData = !(loading || error);
    return (
      <div className="wrapper-card-list">
        {loading && <Spin tip="Loading..." />}
        {hasData && (
          <>
            <Row gutter={[37, 37]} justify="space-around">
              {elements}
            </Row>
            {pagination}
          </>
        )}

        {hasData && movies.length === 0 && <Alert message="No results were found for your search." type="info" />}
        {error && <Alert message="Error" description={`${errMessage}, please try to reload the site`} type="error" />}
      </div>
    );
  }
}
