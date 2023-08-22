export type AMSelectorContextType = {
  searchType: "movie" | "actor";
  setSearchType: (searchType: "moviw" | "actor") => {};
};

export interface IMovieItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieCardProps {
  selected: boolean;
  movie: IMovieItem;
  movies: IMovieItem[];
  setmovies: (newMovies: IMovieItem[]) => void;
  setsearchterm: (newSearchTerm: string) => void;
}

export interface ICastCardProps {
  castMember: ICastItem;
}

export interface ICreditsList {
  id: number;
  cast: ICastItem[];
  crew: ICrewItem[];
}
export interface ICastItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface ICrewItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  credit_id: string;
  department: string;
  job: string;
}
