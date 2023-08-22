"use client";
import { useContext } from "react";
import { useState } from "react";
import { AMSelectorContext } from "../src/app/layout";

const ActorMovieSelector = () => {
  const { selected, setSelected } = useContext(AMSelectorContext);
  // console.log("Selected: ", selected);
  return (
    <div className="flex px-1 py-1 rounded-xl bg-yellow-100 justify-between items-center border-black border-2">
      <div
        className={`px-5 py-2.5 ${
          selected === "movie"
            ? "bg-black rounded-xl text-white"
            : "bg-transparent text-black"
        }  justify-center items-center `}
      >
        <button
          className="text-xl font-normal"
          onClick={() => {
            setSelected("movie");
            console.log("Selected:" + selected);
          }}
        >
          Movies
        </button>
      </div>
      <div
        className={`px-5 py-2.5 ${
          selected === "actor"
            ? "bg-black rounded-xl text-white"
            : "bg-transparent text-black"
        }  justify-center items-center`}
      >
        <button
          className="text-xl font-normal"
          onClick={() => {
            setSelected("actor");
            console.log("Selected:" + selected);
          }}
        >
          Actors
        </button>
      </div>
    </div>
  );
};

export default ActorMovieSelector;
