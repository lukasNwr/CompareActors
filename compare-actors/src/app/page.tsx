import Image from "next/image";
import MovieSearch from "../../components/movieSearch";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-5 justify-center items-center w-screen h-screen py-10 px-20">
        <h1 className="font-bold text-4xl text-center w-1/2">
          Compare the actors and movies, find out the crossovers!
        </h1>

        <MovieSearch />
      </div>
    </main>
  );
}
