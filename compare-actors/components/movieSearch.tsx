"use client";

import React, {
  ChangeEvent,
  use,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Movie, IResultsItem } from "../types";
import { isJsxClosingFragment } from "typescript";
import MovieCard from "./movieCard";

const API_KEY = "bf785a67cbc0a98afb01a72416ac416b";

const MovieSearch = () => {
  const [moviesToCompare, setMoviesToCompare] = useState<string[]>([]);
  const [movieName, setMovieName] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IResultsItem[]>([]);

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

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  console.log(searchTerm);

  return (
    <>
      <div className="flex items-center justify-center border-2 border-slate-100 rounded w-2/3 h-full  px-5 py-5">
        <form className="flex flex-col gap-2">
          <input
            type="text"
            name="movieName"
            className=" border-2 border-black test-black outline-none rounded-md py-2 px-4"
            placeholder="Enter movie name"
            value={searchTerm}
            // onChange={(event) => setMovieName(event.target.value)}
            onChange={handleChange}
          />
          <ul className="flex flex-col gap-2 h-96 overflow-scroll">
            {suggestions?.map((suggestion) => {
              return <MovieCard key={suggestion.id} movie={suggestion} />;
              // return <li key={suggestion.id}>{suggestion.title}</li>;
            })}
          </ul>
          <div>
            <button
              type="submit"
              className="border-2 border-black rounded-md px-4 py-2 hover bg-transparent text-black hover:text-white hover:bg-black"
            >
              Add movie
            </button>
          </div>
        </form>
      </div>

      <div>
        {moviesToCompare?.map((movie) => {
          return <div key={movie}>{movie}</div>;
        })}
      </div>
    </>
  );
};

export default MovieSearch;
