import React from 'react';
import { Row, Col } from 'antd';
import './MoviesList.css';
import PropTypes, { arrayOf } from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesList(props) {
  const { movies } = props;
  const elements = movies.map((movie) => {
    const { id, ...items } = movie;
    return (
      <Col className="gutter-row" span={12} key={id}>
        <MovieCard movie={items} />
      </Col>
    );
  });

  return <Row gutter={[37, 37]}>{elements}</Row>;
}

MoviesList.defaultProps = {};

MoviesList.propTypes = {
  movies: arrayOf(
    PropTypes.shape({
      posterPath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      popularity: PropTypes.number.isRequired,
      voteAverage: PropTypes.number.isRequired,
    })
  ).isRequired,
};
