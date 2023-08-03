import { IMovieItem, IMovieCardProps } from "../types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MovieCard = ({
  movie,
  selected,
  movies,
  setmovies,
  setsearchterm,
}: IMovieCardProps) => {
  const dateParts = movie.release_date.split("-");
  const date = new Date(
    Number(dateParts[0]),
    Number(dateParts[1]) - 1,
    Number(dateParts[2])
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddMovie = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // TODO: Check if the movie is already in the list

    setmovies([...movies, movie]);
    setIsAdded(true);
    setsearchterm("");
  };

  useEffect(() => {
    if (isAdded) {
      document
        .getElementById(movie.id.toString())
        ?.classList.add("animate-hithere");

      setTimeout(() => {
        document
          .getElementById(movie.id.toString())
          ?.classList.remove("animate-hithere");
        setIsAdded(false);
      }, 2000);
    }
  }, [isAdded, movie.id]);

  const handleRemoveMovie = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newMovies = movies.filter((m: IMovieItem) => m.id !== movie.id);
    setmovies(newMovies);
  };

  return (
    <div className="relative" id={`${movie.id}`}>
      <div
        className="flex flex-col justify-end w-52 h-72 md:w-64 md:h-80 rounded-3xl overflow-hidden bg-center bg-cover border-black border-[3px] shadow-black shadow-solidPrimary"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
        }}
      >
        <div className="flex flex-col px-5 py-2.5 justify-center h-20 w-full bg-black rounded-2xl">
          <div className="text-white text-lg md:text-xl font-normal truncate">
            {movie.title}
          </div>
          <div className="text-white text-sm font-thin">{formattedDate}</div>
        </div>
      </div>
      {!selected ? (
        <button
          onClick={handleAddMovie}
          className="px-4 py-2 bg-yellow-300 absolute right-5 top-[17rem] md:top-[19rem] rounded-xl border-black border-2 shadow-black shadow-solidPrimary  hover:translate-x-[0.12rem] hover:translate-y-[0.12rem] hover:shadow-solidPrimaryHover duration-200 
ease-out transition transform origin-top-right"
        >
          <span>Add</span>
        </button>
      ) : (
        <button
          onClick={handleRemoveMovie}
          className="px-4 py-2 bg-orange-600 text-white absolute right-5 top-[17rem] md:top-[19rem] rounded-xl border-black border-2 shadow-black shadow-solidPrimary hover:translate-x-[0.12rem] hover:translate-y-[0.12rem] hover:shadow-solidPrimaryHover"
        >
          <span>Remove</span>
        </button>
      )}
    </div>
  );
};

//   return (
//     <>
//       <div className="flex flex-col w-64 h-[296px] px-2 py-2 justify-evenly items-center gap-5 border border-slate-200 bg-slate-50  rounded-md  hover:bg-slate-100">
//         <Image
//           src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//           alt="movieImage"
//           width={80}
//           height={80}
//           className="rounded-md"
//         />
//         <div className="flex flex-col justify-between gap-4 w-auto">
//           <div className="flex flex-col">
//             <span className="overflow-ellipsis">{movie.title}</span>
//             <span className="text-xs">Released: {formattedDate}</span>
//           </div>
//           {!isStatic ? (
//             <button
//               className="border-2 border-black rounded-md px-3 py-2 w-60 hover:bg-black hover:text-white"
//               onClick={handleAddMovie}
//             >
//               Add movie
//             </button>
//           ) : (
//             <button
//               className="border-2 border-black rounded-md w-60 px-3 py-2 hover:bg-black hover:text-white"
//               onClick={handleRemoveMovie}
//             >
//               Remove movie
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

export default MovieCard;
