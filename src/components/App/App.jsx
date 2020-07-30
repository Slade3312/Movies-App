import React, { Component } from 'react';
// import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header';
import MoviesList from '../MoviesList/MoviesList';
// import Footer from '../Footer/Footer';

export default class App extends Component {
  state = {
    searchValue: 'return',
  };

  moviesSearchQuery = (value) => {
    this.setState({ searchValue: value });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <div className="App">
        <Header moviesSearchQuery={(value) => this.moviesSearchQuery(value)} />
        <MoviesList searchValue={searchValue} />
        {/* <Footer /> */}
      </div>
    );
  }
}
