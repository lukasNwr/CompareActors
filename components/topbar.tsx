import TopBarBounceText from "./topBarBounce";
import ActorMovieSelector from "./actorMovieSelector";

const Topbar = () => {
  return (
    <div className="flex px-10 items-center justify-center md:justify-between w-screen h-20 bg-yellow-300 border-b-4 border-black">
      <span className="text-black text-4xl font-bold">KOMPARATOR</span>
      <div className="flex h-auto items-center gap-4">
        <div className="hidden md:block">
          <TopBarBounceText />
        </div>
        <div className="hidden md:block">
          <ActorMovieSelector />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
