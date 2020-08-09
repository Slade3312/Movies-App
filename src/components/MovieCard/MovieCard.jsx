import React from 'react';
import './MovieCard.css';
import { Button, Rate, Badge } from 'antd';
import { format } from 'date-fns';
import PropTypes, { number } from 'prop-types';
import notPoster from '../../img/notPoster.jpg';
import MovieDBServices from '../../services/MovieDBServices';
import withServiceContext from '../hoc-helpers/withServiceContext';

const { setRating } = new MovieDBServices();

function cropText(text) {
  const spaceIndex = text.lastIndexOf(' ', 140);
  const shortReview = `${text.slice(0, spaceIndex)}...`;
  return shortReview;
}

function onRating(rate, sessionId, id) {
  setRating(rate, sessionId, id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function MovieCard(props) {
  const baseImgSrc = 'https://image.tmdb.org/t/p/w220_and_h330_face/';
  const {
    posterPath,
    title,
    releaseDate,
    overview,
    voteAverage,
    genreIds,
    options: { genres, sessionId },
    id,
    rating,
  } = props;
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
      <Badge count={voteAverage} className="vote-average" />
      <img className="movies-card__poster" src={srcImg} alt="poster" />
      <h2>{title}</h2>
      <p className="movies-card__release">{dateRelease}</p>
      {genreButtons}
      <p className="movies-card__overview">{shortReview}</p>
      <Rate
        className="movies-card__stars"
        allowHalf
        defaultValue={rating}
        count={10}
        onChange={(rate) => onRating(rate, sessionId, id)}
      />
    </div>
  );
}

MovieCard.defaultProps = {
  releaseDate: '',
  posterPath: null,
  overview: 'not overview',
  options: { genres: null, sessionId: null },
  rating: null,
};

MovieCard.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  overview: PropTypes.string,
  voteAverage: PropTypes.number.isRequired,
  genreIds: PropTypes.arrayOf(number).isRequired,
  options: PropTypes.shape({
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    sessionId: PropTypes.string,
  }),
  id: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

export default withServiceContext(MovieCard);
