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
  /* _transformMovie()-ругается eslint на _
    #transformMovie()- нужен плагин для babel так и не решил
    как сделать его приватным */

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

  async getMovies(page, search) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?language=en-En&query=${search}&page=${page}&include_adult=false`
    );
    const totalPages = res.total_pages;
    const movies = res.results;
    const requiredData = movies.map((movie) => this.transformMovie(movie));
    return {
      movies: requiredData,
      totalPages,
    };
  }
}
