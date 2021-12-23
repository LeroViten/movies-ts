import { useState, useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import * as movieAPI from '../../services/apiService';
import MovieArticle from '../../components/MovieArticle/MovieArticle';
import Loader from 'react-loader-spinner';
import IMatchParams from '../../interfaces/MatchParams.interface';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// ! lazy loading subpage components:

const Cast = lazy(
  () => import('./Cast/Cast' /* webpackChunkName: "cast-page" */)
);
const Reviews = lazy(
  () => import('./Reviews/Reviews' /* webpackChunkName: "reviews-page" */)
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');

  const match = useRouteMatch<IMatchParams>();
  const { path } = match;
  const { movieId } = match.params;

  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = () => {
    setStatus('pending');
    movieAPI.getMovieById(movieId).then((response) => {
      setMovie(response);
    });
    setStatus('resolved');
  };

  return (
    <>
      {status === 'pending' && (
        <Loader
          //   className="Loader"
          type="ThreeDots"
          color="#b00b69"
          height={100}
          width={100}
        />
      )}
      {movie && <MovieArticle movie={movie} />}
      <hr />
      <Suspense fallback={<Loader type="Rings" color="#b00b69" />}>
        <Route exact path={`${path}/cast`}>
          {movie && <Cast />}
        </Route>
        <Route exact path={`${path}/reviews`}>
          {movie && <Reviews />}
        </Route>
      </Suspense>
    </>
  );
}
