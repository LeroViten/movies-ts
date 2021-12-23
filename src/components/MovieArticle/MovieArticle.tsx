import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import * as movieAPI from '../../services/apiService';
import BackButton from '../BackButton/BackButton';
import IMovie from '../../interfaces/Movie.interface';
import IMatchParams from '../../interfaces/MatchParams.interface';
import ILocationState from '../../interfaces/LocationState.interface';
import WatchTrailerButton from '../WatchTrailerButton/WatchTrailerButton';
import Modal from '../Modal/Modal';
import YouTubeFrame from '../YouTubeFrame/YouTubeFrame';
import posterError from '../../components/MovieList/error.png';
import { ReactComponent as BackIcon } from '../BackButton/backArrow.svg';
import { ReactComponent as YouTubeIcon } from '../WatchTrailerButton/youtube-icon.svg';
import './MovieArticle.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function MovieArticle({ movie }: IMovie) {
  const [trailers, setTrailers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  const {
    id,
    title,
    release_date,
    vote_average,
    poster_path,
    overview,
    genres,
  } = movie;

  const { url } = useRouteMatch<IMatchParams>();
  const location = useLocation<ILocationState>();

  const properPosterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : posterError;

  useEffect(() => {
    getTrailers();
  }, []);

  const getTrailers = () => {
    setStatus('pending');
    movieAPI.fetchTrailers(id).then((response) => {
      const data = response.results;
      setTrailers(data);
      setStatus('resolved');
      if (status === 'resolved') {
        toggleModal();
      }
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {status === 'pending' && (
        <Loader
          // className="Loader"
          type="ThreeDots"
          color="#b00b69"
          height={100}
          width={100}
        />
      )}
      <BackButton>
        <BackIcon width="30" height="30" fill="black" />
      </BackButton>
      {showModal && (
        <Modal onToggle={toggleModal} aria-label="open trailers">
          <YouTubeFrame trailers={trailers} />
        </Modal>
      )}
      <article className="movieArticle">
        <WatchTrailerButton onClick={getTrailers}>
          <YouTubeIcon width="80" height="50" />
        </WatchTrailerButton>
        <div className="posterThumb">
          <img
            src={properPosterUrl}
            alt={title}
            title={title}
            className="poster"
          />
        </div>

        <div className="infoThumb">
          {title && (
            <h1 className="movieTitle">
              {title}{' '}
              {release_date ? (
                <span>({release_date.substring(0, 4)})</span>
              ) : (
                <span>(N/A)</span>
              )}
            </h1>
          )}

          <p className="score">
            {vote_average ? (
              <b className="votes">Average Vote: {vote_average} ⭐</b>
            ) : null}
          </p>

          <p className="overview">
            <b className="label">Overview: 📝</b>
            <br />
            {overview ? <span>{overview}</span> : <span>N/A</span>}
          </p>

          <b className="label">Genres:</b>

          {genres.length > 0 ? (
            <ul className="genresList">
              {genres.map(({ id, name }) => (
                <li key={id} className="genresList__item">
                  <span>🎥 {name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </article>
      <div className="additionalInfoThumb">
        <p className="additionalText">Additional Information for the movie:</p>
        <div className="addOnsLinks">
          <Link
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            className="showAddonLink"
          >
            Cast
          </Link>
          <Link
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            className="showAddonLink"
          >
            Reviews
          </Link>
        </div>
      </div>
    </>
  );
}
