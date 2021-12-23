import { NavLink } from 'react-router-dom';
import IMovies from '../../interfaces/Movies.interface';
import errorPoster from './error.png';
import './MovieList.scss';

interface IMovieListProps {
  movies: IMovies[];
  url: string;
  location: object | string;
}

export default function MovieList({ movies, url, location }: IMovieListProps) {
  return (
    <>
      <ul className="movieList">
        {movies.map(({ id, title, poster_path, release_date }) => (
          <li key={id} className="movieList__elem">
            <NavLink
              to={{
                pathname: `${url}/${id}`,
                state: { from: location },
              }}
              className="movieCardLink"
            >
              <div className="movieCard">
                <img
                  className="poster"
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300` + poster_path
                      : errorPoster
                  }
                  alt={title}
                />
                <div className="movieCard__details">
                  <h2>{title}</h2>

                  {release_date && <span> ({release_date.slice(0, 4)})</span>}
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
