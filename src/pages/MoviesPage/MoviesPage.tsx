import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as movieAPI from '../../services/apiService';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import IMovies from '../../interfaces/Movies.interface';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import './MoviesPage.scss';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const query = new URLSearchParams(location.search).get('query');

  const [userQuery, setUserQuery] = useState(query ?? '');
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!userQuery) return;

    getData();
  }, [userQuery]);

  const getData = () => {
    if (userQuery.trim() === '') {
      toast.error('Nothing found, repeat search! 😊');
      return;
    }
    setStatus('pending');
    movieAPI.getMovieSearch(userQuery, page).then((response) => {
      const data = response.results;

      if (data.length < 1) {
        toast.error(`Sorry, nothing to show 😢`);
      }
      setMovies((prev) => [...prev, ...data]);
    });
    setPage((prev) => prev + 1);
    setStatus('resolved');

    if (page !== 1) {
      handlePageScroll();
    }
  };

  const handleQuery = (newQuery: string) => {
    if (newQuery === userQuery) return;
    setUserQuery(newQuery);
    setMovies([]);
    setPage(1);

    // pushing user search to queryString for proper return with Back button
    history.push({
      ...location,
      search: `query=${newQuery}`,
    });
  };

  const loadMoreHandler = () => {
    getData();
  };

  const handlePageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const showLoadMore = movies.length > 0 && movies.length >= 19;

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
      <SearchForm searchHandler={handleQuery} />
      <MovieList movies={movies} url={url} location={location} />
      {showLoadMore && <LoadMoreButton onLoadMore={loadMoreHandler} />}
      <ToastContainer
        transition={Zoom}
        autoClose={4000}
        toastStyle={{ backgroundColor: '#c0c0c0' }}
      />
    </>
  );
}
