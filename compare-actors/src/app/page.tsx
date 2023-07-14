import Image from "next/image";
import MainComponent from "../../components/movieSearch";
import Topbar from "../../components/topbar";

export default function Home() {
  return (
    <main>
      <Topbar />
      <div className="flex flex-col gap-5 justify-start items-center w-screen h-screen py-10 px-10">
        <MainComponent />
      </div>
    </main>
  );
}
