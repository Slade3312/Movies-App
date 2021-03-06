import React, { Component } from 'react';
import { Tabs } from 'antd';
import { ServiceProvider } from '../serviceContext/serviceContext';
import './App.css';
import Header from '../Header/Header';
import MoviesList from '../MoviesList/MoviesList';
import MovieDBServices from '../../services/MovieDBServices';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const { getSearchMovies, getGenresList, getSessionId, getRatedMovies } = MovieDBServices;

export default class App extends Component {
  state = {
    searchValue: 'return',
    genres: null,
    sessionId: null,
    activeTab: 'active_search',
  };

  constructor(props) {
    super(props);
    this.TabPane = Tabs.TabPane;
    this.moviesSearchQuery = this.moviesSearchQuery.bind(this);
  }

  componentDidMount() {
    getGenresList()
      .then((value) => {
        this.setState({ genres: value });
      })
      .catch((err) => {
        console.log(err);
      });

    getSessionId()
      .then((id) => {
        this.setState({ sessionId: id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  callback = (key) => {
    this.setState({ activeTab: key });
  };

  moviesSearchQuery(value) {
    console.log('click');
    this.setState({ searchValue: value });
  }

  render() {
    const { TabPane } = Tabs;
    const { searchValue, genres, sessionId, activeTab } = this.state;
    return (
      <ErrorBoundary>
        <ServiceProvider value={genres}>
          <div className="App">
            <Tabs defaultActiveKey="active_search" onChange={this.callback} centered="true">
              <TabPane tab="Search" key="active_search">
                <Header moviesSearchQuery={this.moviesSearchQuery} />
                <MoviesList searchValue={searchValue} getDataMovies={getSearchMovies} sessionId={sessionId} />
              </TabPane>
              <TabPane tab="Rated" key="active_rated">
                <MoviesList getDataMovies={getRatedMovies} activeTab={activeTab} sessionId={sessionId} />
              </TabPane>
            </Tabs>
          </div>
        </ServiceProvider>
      </ErrorBoundary>
    );
  }
}
