import React, { useState } from 'react';
import './MovieCard.css';
import { Button, Rate, Badge } from 'antd';
import { format } from 'date-fns';
import PropTypes, { number } from 'prop-types';
import notPoster from '../../img/notPoster.jpg';
import MovieDBServices from '../../services/MovieDBServices';
import withServiceContext from '../hoc-helpers/withServiceContext';

const MovieCard = (props) => {
  const [isRate, setIsRate] = useState(false);

  const { setRating } = MovieDBServices;

  const cropText = (text) => {
    const spaceIndex = text.lastIndexOf(' ', 140);
    const shortReview = `${text.slice(0, spaceIndex)}...`;
    return shortReview;
  };

  const setStyleBorderBadge = (value) => {
    if (value >= 0 && value < 3) return { borderColor: '#E90000' };
    if (value >= 3 && value < 5) return { borderColor: '#E97E00' };
    if (value >= 5 && value < 7) return { borderColor: '#E9D100' };
    return { borderColor: '#66E900' };
  };

  const onRating = (rate, sessionId, id) => {
    setIsRate(true);
    setTimeout(() => setIsRate(false), 1000);
    setRating(rate, sessionId, id).catch((err) => {
      console.log(err);
    });
  };

  const Notification = () => {
    return (
      <div className="notification">
        <h3>Thank you!</h3>
        <p>Movie added to rating</p>
      </div>
    );
  };
  const {
    posterPath,
    title,
    releaseDate,
    overview,
    voteAverage,
    genreIds,
    genres,
    sessionId,
    id,
    rating,
    activeTab,
  } = props;

  const baseImgSrc = 'https://image.tmdb.org/t/p/w220_and_h330_face/';
  const shortReview = cropText(overview);
  const dateRelease = releaseDate === '' ? 'not release date' : format(new Date(releaseDate), 'PP');
  const srcImg = posterPath === null ? notPoster : baseImgSrc + posterPath;

  let genreButtons = null;
  if (genres) {
    genreButtons = genreIds.map((idButtons) => {
      const { name } = genres.find((genre) => genre.id === idButtons);
      return (
        <Button className="movies-card__genre" size="small" key={idButtons}>
          {name}
        </Button>
      );
    });
  }

  return (
    <div className="movies-card">
      {isRate && <Notification />}
      <Badge count={voteAverage} className="vote-average" style={setStyleBorderBadge(voteAverage)} />
      <img className="movies-card__poster" src={srcImg} alt="poster" />
      <h2>{title}</h2>
      <p className="movies-card__release">{dateRelease}</p>
      {genreButtons}
      <p className="movies-card__overview">{shortReview}</p>
      <Rate
        className="movies-card__stars"
        allowHalf
        disabled={activeTab === 'active_rated'}
        defaultValue={rating}
        count={10}
        onChange={(rate) => onRating(rate, sessionId, id)}
      />
    </div>
  );
};

MovieCard.defaultProps = {
  releaseDate: '',
  posterPath: null,
  overview: 'not overview',
  genres: null,
  sessionId: null,
  rating: null,
};

MovieCard.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  overview: PropTypes.string,
  voteAverage: PropTypes.number.isRequired,
  genreIds: PropTypes.arrayOf(number).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  sessionId: PropTypes.string,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number,
  activeTab: PropTypes.string.isRequired,
};

export default withServiceContext(MovieCard);
