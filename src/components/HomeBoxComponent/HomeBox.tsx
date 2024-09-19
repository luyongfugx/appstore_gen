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
    <div className="border-0 bg-secondary  flex-[68_1_0px] overflow-hidden">
      <div className="inset-0 mx-[60px] mt-[160px] flex w-[90%] justify-center overflow-hidden md:mt-[60px]">
        <TempCrousal templateName={mySlug} />
      </div>
    </div>
  );
};

export default HomeBox;
