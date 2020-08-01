import React from 'react';
import './MovieCard.css';
import { Button, Rate, Badge } from 'antd';
import { format } from 'date-fns';
import PropTypes, { number } from 'prop-types';
import notPoster from '../../img/notPoster.jpg';

function cropText(text) {
  const spaceIndex = text.lastIndexOf(' ', 140);
  const shortReview = `${text.slice(0, spaceIndex)}...`;
  return shortReview;
}

export default function MovieCard(props) {
  const baseImgSrc = 'https://image.tmdb.org/t/p/w220_and_h330_face/';
  const { posterPath, title, releaseDate, overview, popularity, voteAverage, genreIds, genres } = props;
  const shortReview = cropText(overview);
  // console.log(genreIds);
  const dateRelease = releaseDate === '' ? 'not release date' : format(new Date(releaseDate), 'PP');
  const srcImg = posterPath === null ? notPoster : baseImgSrc + posterPath;
  const stars = popularity / 10;
  let genreButtons = null;
  if (genres) {
    genreButtons = genreIds.map((id) => {
      const { name } = genres.find((genre) => genre.id === id);
      return (
        <Button className="movies-card__genre" size="small">
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
      <Rate className="movies-card__stars" disabled defaultValue={stars} count={10} allowHalf />
    </div>
  );
}

MovieCard.defaultProps = {
  releaseDate: '',
  posterPath: null,
  overview: 'not overview',
  genres: null,
};

MovieCard.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  overview: PropTypes.string,
  popularity: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  genreIds: PropTypes.arrayOf(number).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};
