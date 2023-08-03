import Image from "next/image";
import MainComponent from "../../components/movieSearch";
import Topbar from "../../components/topbar";

export default function Home() {
  return (
    <main className="font-archivo">
      <Topbar />
      <div className="flex flex-col gap-5 justify-start items-center w-screen h-screen px-2 py-5 md:py-10 md:px-10">
        <MainComponent />
      </div>
    </main>
  );
}
