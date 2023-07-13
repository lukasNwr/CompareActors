"use client";

import React, {
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
  useRef,
  RefObject,
} from "react";
import { IMovieItem, ICastItem, ICrewItem } from "../types";
import MovieCard from "./movieCard";
import CastCard from "./castCard";
import { FiSearch } from "react-icons/fi";
import { collectGenerateParams } from "next/dist/build/utils";

const API_KEY = "bf785a67cbc0a98afb01a72416ac416b";

const mvTest: IMovieItem = {
  adult: false,
  backdrop_path: "/kYd1ZMWvG9K2Jeop3XWXcTpJ2dB.jpg",
  genre_ids: [878, 12, 28],
  id: 1927,
  original_language: "en",
  original_title: "Hulk",
  overview:
    "Bruce Banner, a genetics researcher with a tragic past, suffers massive radiation exposure in his laboratory that causes him to transform into a raging green monster when he gets angry.",
  popularity: 44.183,
  poster_path: "/qnngKqAcqfH2pBxDoKu5lxzSbTo.jpg",
  release_date: "2003-06-19",
  title: "Hulk",
  video: false,
  vote_average: 5.527,
  vote_count: 5284,
};

const castTest: ICastItem = {
  adult: false,
  gender: 2,
  id: 8783,
  known_for_department: "Acting",
  name: "Eric Bana",
  original_name: "Eric Bana",
  popularity: 20.493,
  profile_path: "/xIjQVywxkymHbbSO7lD2F9f377W.jpg",
  cast_id: 7,
  character: "Bruce Banner / Hulk",
  credit_id: "52fe4323c3a36847f803d073",
  order: 0,
};

const MovieSearch = () => {
  const [movies, setMovies] = useState<IMovieItem[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IMovieItem[]>([]);
  const [commonCastMembers, setCommonCastMembers] = useState<ICastItem[]>([]);

  const scrollBarRef: RefObject<HTMLUListElement> = useRef(null);

  const slide = (shift: any) => {
    if (scrollBarRef.current) {
      scrollBarRef.current.scrollLeft += shift;
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    fetchSuggestions(value);
  };

  const fetchSuggestions = useCallback(async (value: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
    );
    const data = await response.json();
    setSuggestions(data?.results);
  }, []);

  const fetchCast = async (movie: IMovieItem) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=bf785a67cbc0a98afb01a72416ac416b&language=en-US&page=1&api_key=${API_KEY}`
      );
      const data = await res.json();
      const cast = data?.cast;
      return cast as ICastItem[];
    } catch (error) {
      console.error(`Failed to fetch cast for movie ${movie.id}:`, error);
      return [];
    }
  };

  const fetchCrew = async (movie: IMovieItem) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=bf785a67cbc0a98afb01a72416ac416b&language=en-US&page=1&api_key=${API_KEY}`
      );
      const data = await res.json();
      const crew = data?.crew;
      return crew as ICrewItem[];
    } catch (error) {
      console.error(`Failed to fetch crew for movie ${movie.id}:`, error);
      return [];
    }
  };

  const fetchCastMembers = async () => {
    try {
      const castPromises = movies.map((movie) => fetchCast(movie));
      const castArrays = await Promise.all(castPromises);
      return castArrays;
    } catch (error) {
      console.error("Failed to fetch cast members:", error);
      return [];
    }
  };

  const filteredCastMembers = async () => {
    try {
      const castArrays = await fetchCastMembers();
      console.log("cast arrays: ", castArrays);
      const filteredCast = castArrays.reduce((acc, curr) => {
        const accIds = acc.map((castMember) => castMember.id);
        const currIds = curr.map((castMember) => castMember.id);
        const commonIds = accIds.filter((id) => currIds.includes(id));
        return acc.filter((castMember) => commonIds.includes(castMember.id));
      });
      console.log("filtered cAst: ", filteredCast);
      setCommonCastMembers(filteredCast);
    } catch (error) {
      console.error("Failed to filter cast members:", error);
      setCommonCastMembers([]);
    }
  };

  useEffect(() => {
    console.log("Updated common cast members:", commonCastMembers);
  }, [commonCastMembers]);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  return (
    <>
      {/* <MovieCard
        key={mvTest.id}
        selected={true}
        movie={mvTest}
        movies={movies}
        setmovies={setMovies}
        setsearchterm={setSearchTerm}
      /> */}

      <div className="flex items-start justify-center  rounded w-full">
        <div className="flex flex-col gap-2 w-full px-10">
          <div className="flex w-full justify-center">
            <div className="w-[500px] bg-blue-200 flex  relative">
              <input
                type="text"
                name="movieName"
                className="outline-none border-[3px] border-black rounded-md py-3 px-6 w-[500px] bg-white placeholder:text-black placeholder:font-medium placeholder:text-xl shadow-black shadow-solidPrimary"
                placeholder="Seearch..."
                value={searchTerm}
                onChange={handleChange}
              />
              <div className="absolute right-[20px] bottom-2 bg-white w-14 h-14 flex items-center justify-center rounded-full border-[3px] border-black px-2 py-2">
                <FiSearch size={"2em"} />
              </div>
            </div>
          </div>
          <ul
            ref={scrollBarRef}
            className="flex flex-row items-center gap-2 h-auto overflow-scroll w-full"
          >
            {movies?.map((movie) => {
              return (
                <>
                  <div className="px-5 py-24">
                    <MovieCard
                      key={movie.id}
                      selected={true}
                      movie={movie}
                      movies={movies}
                      setmovies={setMovies}
                      setsearchterm={setSearchTerm}
                    />
                  </div>
                </>
              );
            })}
            {suggestions?.map((suggestion) => {
              return (
                <>
                  <div className="px-5 py-24">
                    <MovieCard
                      key={suggestion.id}
                      selected={false}
                      movie={suggestion}
                      movies={movies}
                      setmovies={setMovies}
                      setsearchterm={setSearchTerm}
                    />
                  </div>
                </>
              );
            })}
          </ul>
          <div className="flex w-full h-auto bg-green-200 justify-between">
            <button onClick={() => slide(-150)}>left</button>
            <button onClick={() => slide(+150)}>right</button>
          </div>
        </div>
      </div>
      {/* TODO: allow users to use the mouse wheel to scroll horizontally when hovering over the list */}
      {movies.length < 2 ? null : (
        <button
          onClick={filteredCastMembers}
          className="px-4 py-2 bg-white rounded-xl text-black border-2 border-black shadow-solidPrimary"
        >
          Compare
        </button>
      )}
      {commonCastMembers.length === 0 ? (
        <div className="text-black text-lg font-bold px-10 py-10">
          No Common Cast Members!
        </div>
      ) : (
        <ul>
          {commonCastMembers.map((castMember) => {
            return <CastCard key={castMember.id} castMember={castMember} />;
          })}
        </ul>
      )}

      {/* <div>
        <CastCard castMember={castTest} />
      </div> */}
    </>
  );
};

export default MovieSearch;
