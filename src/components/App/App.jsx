import React, { Component } from 'react';
import { Tabs } from 'antd';
import { ServiceProvider } from '../serviceContext/serviceContext';
import './App.css';
import Header from '../Header/Header';
import MoviesList from '../MoviesList/MoviesList';
import MovieDBServices from '../../services/MovieDBServices';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const { getSearchMovies, getGenresList, getSessionId, getRatedMovies } = new MovieDBServices();

export default class App extends Component {
  state = {
    searchValue: 'return',
    genres: null,
    sessionId: null,
    activeTab: '1',
  };

  constructor(props) {
    super(props);
    this.TabPane = Tabs.TabPane;
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

  moviesSearchQuery = (value) => {
    this.setState({ searchValue: value });
  };

  callback = (key) => {
    this.setState({ activeTab: key });
  };

  render() {
    const { TabPane } = Tabs;
    const { searchValue, genres, sessionId, activeTab } = this.state;
    return (
      <ErrorBoundary>
        <ServiceProvider value={genres}>
          <div className="App">
            <Tabs defaultActiveKey="1" onChange={this.callback} centered="true">
              <TabPane tab="Search" key="1">
                <Header moviesSearchQuery={(value) => this.moviesSearchQuery(value)} />
                <MoviesList searchValue={searchValue} getDataMovies={getSearchMovies} sessionId={sessionId} />
              </TabPane>
              <TabPane tab="Rated" key="2">
                <MoviesList getDataMovies={getRatedMovies} activeTab={activeTab} sessionId={sessionId} />
              </TabPane>
            </Tabs>
          </div>
        </ServiceProvider>
      </ErrorBoundary>
    );
  }
}
