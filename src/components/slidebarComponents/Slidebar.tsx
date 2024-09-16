import React from "react";

import Languages from "./Languages";
import TabsComp from "./TabsComp";
import Output from "./Output";
function Slidebar() {
  return (
    <div className="w-[25%]  bg-white border-r py-4 px-3 flex flex-col gap-6">
      <Output />
      <Languages />
      <TabsComp />
    </div>
  );
}

export default Slidebar;
