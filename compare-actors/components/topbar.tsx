const Topbar = () => {
  return (
    <div className="flex px-10 items-center justify-between w-screen h-20 bg-yellow-300 border-b-4 border-black">
      <span className=" text-black text-4xl font-bold">KOMPARATOR</span>
      <div className="flex px-1 py-1 rounded-xl bg-yellow-100 justify-between items-center border-black border-2">
        <div className="px-5 py-2.5 bg-black rounded-xl justify-center items-center ">
          <div className="text-xl text-white font-normal">Movies</div>
        </div>
        <div className="px-5 py-2.5 bg-transparent rounded-xl justify-center items-center ">
          <div className="text-xl text-black font-normal">Actors</div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
