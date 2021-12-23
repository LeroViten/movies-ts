import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import * as movieAPI from '../../services/apiService';
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import IMovies from '../../interfaces/Movies.interface';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './HomePage.scss';

export default function HomePage() {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = () => {
    setStatus('pending');

    movieAPI.getPopularMovies(page).then((response) => {
      const data = response.results;
      setMovies((prev) => [...prev, ...data]);
    });
    setPage((prev) => prev + 1);

    if (page !== 1) {
      handlePageScroll();
    }
    setStatus('resolved');
  };

  const loadMoreHandler = () => {
    getTrending();
  };

  const handlePageScroll = () => {
    window.scrollTo({
      left: 0,
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
      {movies ? (
        <MovieList movies={movies} url={'movies'} location={'/'} />
      ) : (
        <h2>Error getting trending movies 😟</h2>
      )}
      {showLoadMore && <LoadMoreButton onLoadMore={loadMoreHandler} />}
    </>
  );
}
// export { };

// const response = {
//   page: 1,
//   results: [
//     {
//   release_date: '2021-11-24',
//   id: 460458,
//   adult: false,
//   backdrop_path: '/o76ZDm8PS9791XiuieNB93UZcRV.jpg',
//   genre_ids: [27, 28, 878],
//   original_language: 'en',
//   original_title: 'Resident Evil: Welcome to Raccoon City',
//   poster_path: '/3eVpNCMoi3C8lA0F0n2retnwvCK.jpg',
//   vote_count: 199,
//   video: false,
//   vote_average: 6.3,
//   title: 'Resident Evil: Welcome to Raccoon City',
//   overview:
//     'Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company’s exodus left the city a wasteland…with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever…changed…and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night.',
//   popularity: 660.568,
//   media_type: 'movie',
//     },
//     {
//       original_language: 'en',
//       original_title: 'Spider-Man: No Way Home',
//       id: 634649,
//       video: false,
//       vote_average: 8.6,
//       overview:
//         'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
//       release_date: '2021-12-15',
//       vote_count: 1839,
//       adult: false,
//       backdrop_path: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
//       title: 'Spider-Man: No Way Home',
//       genre_ids: [28, 12, 878],
//       poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
//       popularity: 20686.826,
//       media_type: 'movie',
//     },
//     {
//       adult: false,
//       backdrop_path: '/emo7xgyCvlmbeTHTlNofKjhBE7F.jpg',
//       genre_ids: [18, 36],
//       id: 517088,
//       original_language: 'en',
//       original_title: 'Being the Ricardos',
//       overview:
//         'Follows Lucille Ball and Desi Arnaz as they face a crisis that could end their careers and another that could end their marriage.',
//       poster_path: '/oztBLWdRk5gApYmNdADXvXkLT5m.jpg',
//       release_date: '2021-12-10',
//       title: 'Being the Ricardos',
//       video: false,
//       vote_average: 7.3,
//       vote_count: 14,
//       popularity: 22.305,
//       media_type: 'movie',
//     },
//     {
//       release_date: '2021-12-16',
//       id: 624860,
//       adult: false,
//       backdrop_path: '/eNI7PtK6DEYgZmHWP9gQNuff8pv.jpg',
//       genre_ids: [878, 28, 12, 53],
//       original_language: 'en',
//       original_title: 'The Matrix Resurrections',
//       poster_path: '/gjpM7NNfI5memp40mwqF1zxlLfz.jpg',
//       vote_count: 57,
//       video: false,
//       vote_average: 7.5,
//       title: 'The Matrix Resurrections',
//       overview:
//         "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
//       popularity: 1059.312,
//       media_type: 'movie',
//     },
//     {
//       id: 580489,
//       video: false,
//       vote_average: 7.2,
//       overview:
//         'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
//       release_date: '2021-09-30',
//       adult: false,
//       backdrop_path: '/eENEf62tMXbhyVvdcXlnQz2wcuT.jpg',
//       vote_count: 4869,
//       genre_ids: [878, 28, 12],
//       title: 'Venom: Let There Be Carnage',
//       original_language: 'en',
//       original_title: 'Venom: Let There Be Carnage',
//       poster_path: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
//       popularity: 7992.617,
//       media_type: 'movie',
//     },
//     {
//       backdrop_path: '/ibdmSDwCpDYNdIkGeu7prsMVzYZ.jpg',
//       genre_ids: [18, 878],
//       original_language: 'en',
//       original_title: 'Swan Song',
//       poster_path: '/y0WW5vX58oMEg9aRRTB5QtG1Vyn.jpg',
//       video: false,
//       vote_average: 7.5,
//       id: 765245,
//       overview:
//         'In the near future, Cameron Turner is diagnosed with a terminal illness. Presented with an experimental solution to shield his wife and son from grief, he grapples with altering their fate.',
//       release_date: '2021-12-17',
//       vote_count: 63,
//       title: 'Swan Song',
//       adult: false,
//       popularity: 299.796,
//       media_type: 'movie',
//     },
//     {
//       id: 370172,
//       video: false,
//       vote_average: 7.5,
//       overview:
//         'Bond has left active service and is enjoying a tranquil life in Jamaica. His peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.',
//       release_date: '2021-09-29',
//       adult: false,
//       backdrop_path: '/r2GAjd4rNOHJh6i6Y0FntmYuPQW.jpg',
//       vote_count: 2672,
//       genre_ids: [12, 28, 53],
//       title: 'No Time to Die',
//       original_language: 'en',
//       original_title: 'No Time to Die',
//       poster_path: '/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg',
//       popularity: 1284.626,
//       media_type: 'movie',
//     },
//     {
//       vote_count: 4880,
//       adult: false,
//       backdrop_path: '/jtVl3nN5bJ4t7pgakLfGJmOrqZm.jpg',
//       vote_average: 7.9,
//       genre_ids: [878, 12],
//       video: false,
//       original_language: 'en',
//       original_title: 'Dune',
//       poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
//       title: 'Dune',
//       overview:
//         "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
//       release_date: '2021-09-15',
//       id: 438631,
//       popularity: 931.676,
//       media_type: 'movie',
//     },
//     {
//       genre_ids: [18, 27, 9648],
//       id: 516329,
//       original_language: 'en',
//       original_title: 'Antlers',
//       poster_path: '/cMch3tiexw3FdOEeZxMWVel61Xg.jpg',
//       video: false,
//       vote_average: 6.5,
//       overview:
//         'A small-town Oregon teacher and her brother, the local sheriff, discover a young student is harbouring a dangerous secret that could have frightening consequences.',
//       release_date: '2021-10-28',
//       vote_count: 157,
//       title: 'Antlers',
//       adult: false,
//       backdrop_path: '/9fzNf2QcsHVvdx5g5QUOgAWpADw.jpg',
//       popularity: 939.781,
//       media_type: 'movie',
//     },
//     {
//       genre_ids: [28, 12, 878],
//       original_language: 'en',
//       original_title: 'Spider-Man: Far From Home',
//       poster_path: '/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
//       video: false,
//       vote_average: 7.5,
//       overview:
//         'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
//       release_date: '2019-06-28',
//       title: 'Spider-Man: Far From Home',
//       vote_count: 11362,
//       adult: false,
//       backdrop_path: '/ng6SSB3JhbcpKTwbPDsRwUYK8Cq.jpg',
//       id: 429617,
//       popularity: 2365.74,
//       media_type: 'movie',
//     },
//     {
//       adult: false,
//       backdrop_path: '/AmLpWYm9R3Ur2FLPgj5CH3wR8wp.jpg',
//       genre_ids: [878, 53],
//       id: 739413,
//       original_language: 'en',
//       original_title: 'Mother/Android',
//       overview:
//         'Georgia and her boyfriend Sam go on a treacherous journey to escape their country, which is caught in an unexpected war with artificial intelligence. Days away from the arrival of their first child, the couple must face No Man’s Land—a stronghold of the android uprising—in hopes of reaching safety before giving birth.',
//       poster_path: '/rO3nV9d1wzHEWsC7xgwxotjZQpM.jpg',
//       release_date: '2021-12-17',
//       title: 'Mother/Android',
//       video: false,
//       vote_average: 6.7,
//       vote_count: 31,
//       popularity: 85.009,
//       media_type: 'movie',
//     },
//     {
//       video: false,
//       id: 566525,
//       overview:
//         'Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.',
//       release_date: '2021-09-01',
//       vote_count: 4426,
//       adult: false,
//       backdrop_path: '/cinER0ESG0eJ49kXlExM0MEWGxW.jpg',
//       vote_average: 7.8,
//       genre_ids: [28, 12, 14],
//       title: 'Shang-Chi and the Legend of the Ten Rings',
//       original_language: 'en',
//       original_title: 'Shang-Chi and the Legend of the Ten Rings',
//       poster_path: '/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg',
//       popularity: 3100.52,
//       media_type: 'movie',
//     },
//     {
//       adult: false,
//       backdrop_path: '/u4Vm8n0suBYimsUoarqMw5vxNU8.jpg',
//       genre_ids: [18, 35, 10749],
//       id: 542178,
//       original_language: 'en',
//       original_title: 'The French Dispatch',
//       overview:
//         'The quirky staff of an American magazine based in 1970s France puts out its last issue, with stories featuring an artist sentenced to life imprisonment, student riots, and a kidnapping resolved by a chef.',
//       poster_path: '/6JXR3KJH5roiBCjWFt09xfgxHZc.jpg',
//       release_date: '2021-10-21',
//       title: 'The French Dispatch',
//       video: false,
//       vote_average: 7.4,
//       vote_count: 793,
//       popularity: 613.545,
//       media_type: 'movie',
//     },
//     {
//       genre_ids: [16, 878, 10751, 35],
//       original_language: 'en',
//       original_title: "Ron's Gone Wrong",
//       poster_path: '/gA9QxSravC2EVEkEKgyEmDrfL0e.jpg',
//       video: false,
//       vote_average: 8.4,
//       overview:
//         "In a world where walking, talking, digitally connected bots have become children's best friends, an 11-year-old finds that his robot buddy doesn't quite work the same as the others do.",
//       release_date: '2021-10-15',
//       title: "Ron's Gone Wrong",
//       vote_count: 443,
//       adult: false,
//       backdrop_path: '/axMEROxH94BveBZBfPctWX4qLe4.jpg',
//       id: 482321,
//       popularity: 1429.334,
//       media_type: 'movie',
//     },
//     {
//       id: 598331,
//       backdrop_path: '/vbcjMsuQs1BbM9vjAY3rjBvhPlg.jpg',
//       genre_ids: [10751, 35, 16],
//       vote_count: 43,
//       original_language: 'en',
//       original_title: 'Rumble',
//       poster_path: '/mVKfyo2YQ1Sf0fKzZfc5t9HM6eK.jpg',
//       title: 'Rumble',
//       video: false,
//       vote_average: 7.6,
//       adult: false,
//       overview:
//         'In a world where monster wrestling is a global sport and monsters are superstar athletes, teenage Winnie seeks to follow in her father’s footsteps by coaching a loveable underdog monster into a champion.',
//       release_date: '2021-12-15',
//       popularity: 148.025,
//       media_type: 'movie',
//     },
//     {
//       original_language: 'en',
//       original_title: 'Encanto',
//       id: 568124,
//       video: false,
//       vote_average: 7.3,
//       overview:
//         "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
//       release_date: '2021-11-24',
//       vote_count: 383,
//       adult: false,
//       backdrop_path: '/5RuR7GhOI5fElADXZb0X2sr9w5n.jpg',
//       title: 'Encanto',
//       genre_ids: [16, 35, 10751, 14],
//       poster_path: '/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
//       popularity: 2116.967,
//       media_type: 'movie',
//     },
//     {
//       original_language: 'en',
//       original_title: 'The Last Duel',
//       poster_path: '/zjrJE0fpzPvX8saJXj8VNfcjBoU.jpg',
//       video: false,
//       vote_average: 7.6,
//       id: 617653,
//       release_date: '2021-10-13',
//       title: 'The Last Duel',
//       vote_count: 1053,
//       adult: false,
//       backdrop_path: '/mFbS5TwN95BcSEfiztdchLgTQ0v.jpg',
//       overview:
//         'King Charles VI declares that Knight Jean de Carrouges settle his dispute with his squire, Jacques Le Gris, by challenging him to a duel.',
//       genre_ids: [28, 18, 36],
//       popularity: 1671.136,
//       media_type: 'movie',
//     },
//     {
//       genre_ids: [18, 53],
//       id: 645886,
//       original_language: 'en',
//       original_title: 'The Unforgivable',
//       poster_path: '/gPQM1zqqsm6Lw1tHF41BwbmOkya.jpg',
//       video: false,
//       vote_average: 7.7,
//       overview:
//         'A woman is released from prison after serving a sentence for a violent crime and re-enters a society that refuses to forgive her past.',
//       release_date: '2021-11-24',
//       vote_count: 585,
//       title: 'The Unforgivable',
//       adult: false,
//       backdrop_path: '/kbOB9DGl8qwhDRcXOmXfmcmadeD.jpg',
//       popularity: 662.041,
//       media_type: 'movie',
//     },
//     {
//       vote_average: 6.6,
//       overview:
//         "Peter Parker is an outcast high schooler abandoned by his parents as a boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most teenagers, Peter is trying to figure out who he is and how he got to be the person he is today. As Peter discovers a mysterious briefcase that belonged to his father, he begins a quest to understand his parents' disappearance – leading him directly to Oscorp and the lab of Dr. Curt Connors, his father's former partner. As Spider-Man is set on a collision course with Connors' alter ego, The Lizard, Peter will make life-altering choices to use his powers and shape his destiny to become a hero.",
//       release_date: '2012-06-23',
//       title: 'The Amazing Spider-Man',
//       adult: false,
//       backdrop_path: '/sLWUtbrpiLp23a0XDSiUiltdFPJ.jpg',
//       genre_ids: [28, 12, 14],
//       id: 1930,
//       original_language: 'en',
//       original_title: 'The Amazing Spider-Man',
//       poster_path: '/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg',
//       vote_count: 13879,
//       video: false,
//       popularity: 2792.495,
//       media_type: 'movie',
//     },
//     {
//       id: 557,
//       release_date: '2002-05-01',
//       adult: false,
//       backdrop_path: '/sWvxBXNtCOaGdtpKNLiOqmwb10N.jpg',
//       genre_ids: [14, 28],
//       vote_count: 14705,
//       original_language: 'en',
//       original_title: 'Spider-Man',
//       poster_path: '/gSZyYEK5AfZuOFFjnVPUCLvdOD6.jpg',
//       title: 'Spider-Man',
//       video: false,
//       vote_average: 7.2,
//       overview:
//         'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.',
//       popularity: 2306.699,
//       media_type: 'movie',
//     },
//   ],
//   total_pages: 1000,
//   total_results: 20000,
// };
