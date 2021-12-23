export default interface IMovie {
  movie: {
    id: number | string;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    overview: string;
    genres: [
      {
        id: number;
        name: string;
      }
    ];
  };
}
