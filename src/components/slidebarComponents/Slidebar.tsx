"use client";
import React from "react";
import TabsComp from "./TabsComp";
function Slidebar() {
  return (
    <div className="z-50 min-w-[120px] bg-background md:min-w-[240px] overflow-hidden  flex-[16_1_0px] h-full ">
      <div className="flex h-full">
        <TabsComp />
      </div>
    </div>
  );
}

export default Slidebar;
