import React, { Component } from 'react';
// import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header';
import MoviesList from '../MoviesList/MoviesList';
import MovieDBServices from '../../services/MovieDBServices';

const { getMovies, getGenresList } = new MovieDBServices();

export default class App extends Component {
  state = {
    searchValue: 'return',
    genres: null,
  };

  componentDidMount() {
    const { genres } = this.state;
    if (!genres) {
      getGenresList()
        .then((value) => {
          this.setState({ genres: value });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  moviesSearchQuery = (value) => {
    this.setState({ searchValue: value });
  };

  render() {
    const { searchValue, genres } = this.state;
    return (
      <div className="App">
        <Header moviesSearchQuery={(value) => this.moviesSearchQuery(value)} />
        <MoviesList searchValue={searchValue} genres={genres} getMovies={getMovies} />
      </div>
    );
  }
}
