export default class MovieDBServices {
  static token = process.env.REACT_APP_TOKEN_KEY;

  static baseUrl = 'https://api.themoviedb.org/3';

  static workResources = async (url, method, body) => {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Could not fetch${url} , received ${res.status}`);
    }
    return res.json();
  };

  static setRating = async (rate, sessionId, id) => {
    const body = {
      value: rate,
    };
    const res = await this.workResources(
      `https://z4vrpkijmodhwsxzc.stoplight-proxy.io/3/movie/${id}/rating?guest_session_id=${sessionId}`,
      // `${this.baseUrl}/movie/${id}/rating?guest_session_id=${sessionId}`, - это не работает!
      'POST',
      body
    );

    return res;
  };

  /* _transformMovie()-ругается eslint на _
    #transformMovie()- нужен плагин для babel так и не решил
    как сделать его приватным */

  static transformMovie(movie) {
    return {
      posterPath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      id: movie.id,
      genreIds: movie.genre_ids,
      rating: movie.rating,
    };
  }

  static getSessionId = async () => {
    const res = await this.workResources(`${this.baseUrl}/authentication/guest_session/new`);
    return res.guest_session_id;
  };

  static getSearchMovies = async (options) => {
    const { page, search } = options;
    const res = await this.workResources(
      `${this.baseUrl}/search/movie?&language=en-En&query=${search}&page=${page}&include_adult=false`
    );
    const totalPages = res.total_pages;
    const movies = res.results;
    const requiredData = movies.map((movie) => this.transformMovie(movie));
    return {
      movies: requiredData,
      totalPages,
    };
  };

  static getRatedMovies = async (options) => {
    const { sessionId, page } = options;
    const res = await this.workResources(
      `${this.baseUrl}/guest_session/${sessionId}/rated/movies?&page=${page}&language=en-US&sort_by=created_at.asc`
    );
    const totalPages = res.total_pages;
    const movies = res.results;
    const requiredData = movies.map((movie) => this.transformMovie(movie));
    return {
      movies: requiredData,
      totalPages,
    };
  };

  static getGenresList = async () => {
    const res = await this.workResources(`${this.baseUrl}/genre/movie/list?&language=en-US`);
    return res.genres;
  };
}
