import React from "react";
import { ICastCardProps, ICastItem } from "../types";
import Image from "next/image";

const CastCard: React.FC<ICastCardProps> = ({ castMember }) => {
  const { name = "Unknown", profile_path = "" } = castMember;

  return (
    <div className="flex flex-col items-center gap-2 border-2 border-black px-2 py-2 rounded-2xl shadow-solidPrimary">
      <div className="w-24 h-32 overflow-hidden rounded-xl  object-scale-down">
        <Image
          src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
          width={100}
          height={100}
          alt="castImage"
          className="border-black border-2"
        />
      </div>
      <div>{castMember.name}</div>
    </div>
  );
};

export default CastCard;
