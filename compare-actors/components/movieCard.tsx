import React from "react";
import { IResultsItem, MovieCardProps } from "../types";
import Image from "next/image";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <>
      <div className="flex items-center gap-5 ">
        <Image
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt="movieImage"
          width={50}
          height={50}
        />
        <div>
          <h1>{movie.title}</h1>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
