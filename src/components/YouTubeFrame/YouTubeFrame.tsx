import './YouTubeFrame.scss';
import errorImage from './error.png';

interface ITrailers {
  trailers: {
    name: string;
    key: string;
  }[];
}

export default function YouTubeFrame({ trailers }: ITrailers) {
  return (
    <>
      {trailers.length !== 0 ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailers[0].key}`}
          title={trailers[0].name}
          className="iFrame"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>
            Sorry, no trailer for this movie 😢
          </h2>
          <img src={errorImage} alt="no trailer" />
        </>
      )}
    </>
  );
}
