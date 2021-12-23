export default interface IMovies {
  release_date: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  poster_path: string;
  vote_count: number;
  video: boolean;
  vote_average: number;
  title: string;
  overview: string;
  popularity: number;
  media_type: string;
}
