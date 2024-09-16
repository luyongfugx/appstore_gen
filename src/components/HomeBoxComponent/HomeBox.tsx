import React from "react";
import TitleAndDescForm from "./TitleAndDescForm";

import NextBackBtn from "./NextBackBtn";
import HomeFormHeader from "./HomeFormHeader";
import AddImage from "./AddImage";
import TempCrousal from "../Crousals/TempCrousal";

interface HomeBoxProps {
  mySlug: string;
}

const HomeBox: React.FC<HomeBoxProps> = ({ mySlug }) => {
  return (
    <div className="p-4  h-full w-[75%] flex flex-col">
      <div className="p-3  flex bg-white  border border-input rounded-md">
        {/* LEFT SIDE  */}

        {/* RIGHT SIDE  */}
        <div className="flex h-full w-full items-start justify-start">
          <TempCrousal templateName={mySlug} />
        </div>
      </div>
      <NextBackBtn />
    </div>
  );
};

export default HomeBox;
