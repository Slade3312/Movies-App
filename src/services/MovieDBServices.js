export default class MovieDBServices {
  async getResource(url) {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGEzOGVlMGVmNjMwYjczZmZkZDhkZjdlZmM3ZTA1ZCIsInN1YiI6IjVmMTY1NmQ4YzkyYzVkMDAzNjMwMzJjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4pVDmgfEggVyLjVUrISqiR7Cvooz7xtOqBVIs-Yinxo';

    const res = await fetch(url, {
      metod: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Could not fetch${url} , received ${res.status}`);
    }
    return res.json();
  }

  transformMovie(movie) {
    return {
      posterPath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      popularity: movie.popularity,
      voteAverage: movie.vote_average,
      id: movie.id,
    };
  }

  async getMovies() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?language=en-En&query=return&page=1&include_adult=false`
    );
    const movies = res.results;
    return movies.map((movie) => this.transformMovie(movie));
  }
}
