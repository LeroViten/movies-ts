import axios from 'axios';

type TId = string | number;

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const POPULAR_URL = '/trending/movie/day';
const SEARCH_URL = '/search/movie';
const ID_URL = '/movie/';

export async function getPopularMovies(page: number) {
  try {
    const { data } = await axios.get(
      `${POPULAR_URL}?api_key=${API_KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieSearch(movie: string, page: number) {
  try {
    const { data } = await axios.get(
      `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieById(id: TId) {
  try {
    const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCast(id: TId) {
  try {
    const { data } = await axios.get(
      `${ID_URL}${id}/credits?api_key=${API_KEY}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchReviews(id: TId) {
  try {
    const { data } = await axios.get(
      `${ID_URL}${id}/reviews?api_key=${API_KEY}&page=1`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTrailers(id: TId) {
  try {
    const { data } = await axios.get(
      `${ID_URL}/${id}/videos?api_key=${API_KEY}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
