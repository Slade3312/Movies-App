import React, { Component } from 'react';
// import logo from '../../logo.svg';
import './App.css';
// import Header from '../Header/Header';
import MoviesList from '../MoviesList/MoviesList';
// import Footer from '../Footer/Footer';
import MovieDBServices from '../../services/MovieDBServices';

export default class App extends Component {
  movieDBServices = new MovieDBServices();

  state = {
    movies: [],
  };

  componentDidMount() {
    this.updateStateTemp();
  }

  updateStateTemp() {
    this.movieDBServices.getMovies().then((data) => {
      const movies = data.slice(0, 6);
      this.setState({ movies });
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        {/* <Header /> */}
        <MoviesList movies={movies} />
        {/* <Footer /> */}
      </div>
    );
  }
}
