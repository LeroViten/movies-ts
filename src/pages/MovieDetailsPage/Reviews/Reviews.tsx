import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import IMatchParams from '../../../interfaces/MatchParams.interface';
import * as movieAPI from '../../../services/apiService';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './Reviews.scss';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');

  const match = useRouteMatch<IMatchParams>();
  const { movieId } = match.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setStatus('pending');
    movieAPI.fetchReviews(movieId).then((response) => {
      setReviews(response.results);
    });
    setStatus('resolved');
    handlePageScroll();
  };

  const handlePageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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
      {reviews.length === 0 && (
        <h3 style={{ textAlign: 'center' }}>No Reviews found for that movie</h3>
      )}
      {reviews.length !== 0 && (
        <div className="reviewsThumb">
          <h3 style={{ textAlign: 'center' }}>
            Popular Reviews for this movie:
          </h3>
          <ul className="reviewsList">
            {reviews.map(({ id, author, content, author_details, url }) => (
              <li key={id} className="reviewsList__item">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="userNameLink"
                >
                  📝 {author} :
                </a>
                <p className="reviewContent">{content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
