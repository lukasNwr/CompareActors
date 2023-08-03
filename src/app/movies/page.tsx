const API_KEY = "bf785a67cbc0a98afb01a72416ac416b";

async function getMovie() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.results as any[];
}

export default async function Movies() {
  const movies = await getMovie();

  return (
    <main>
      <h1 className=" font-bold text-xl text-violet-400">Hello friend!</h1>
      <div>
        {movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
    </main>
  );
}

function Movie({ movie }: any) {
  const { id, title, overview, poster_path } = movie || {};

  return <div>{title}</div>;
}
