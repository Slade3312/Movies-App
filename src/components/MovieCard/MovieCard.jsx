import React from 'react';
import './MovieCard.css';
import { Button, Rate, Badge } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

function cropText(text) {
  const spaceIndex = text.lastIndexOf(' ', 200);
  const shortReview = `${text.slice(0, spaceIndex)}...`;
  return shortReview;
}

export default function MovieCard(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { posterPath, title, releaseDate, overview, popularity, voteAverage } = props.movie;
  const shortReview = cropText(overview);
  const dateRelease = format(new Date(releaseDate), 'PP');
  const srcImg = `https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}`;
  const stars = popularity / 10;
  return (
    <div className="movies-card">
      <Badge count={voteAverage} className="vote-average" />
      <img className="poster-card" src={srcImg} alt="poster" />
      <h2>{title}</h2>
      <p>{dateRelease}</p>
      <Button className="genre" size="small">
        Drama
      </Button>
      <Button className="genre" size="small">
        Action
      </Button>
      <p>{shortReview}</p>
      <Rate disabled defaultValue={stars} count={10} allowHalf />
    </div>
  );
}

MovieCard.defaultProps = {};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    posterPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    popularity: PropTypes.number.isRequired,
    voteAverage: PropTypes.number.isRequired,
  }).isRequired,
};
