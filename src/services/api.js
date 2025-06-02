const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '14d14d317e7936ec61c7763e22ff83f6';

export const getTrendingMovies = () =>
  fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1`);

export const getMovieById = id =>
  fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

export const getMovieByName = name =>
  fetch(`${BASE_URL}/search/movie?query=${name}&api_key=${API_KEY}&page=1`);

export const getFilmCasts = id =>
  fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);

export const getFilmReviews = id =>
  fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
