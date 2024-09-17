import React from "react";

import Languages from "./Languages";
import TabsComp from "./TabsComp";
import Output from "./Output";
function Slidebar({ templateName }) {
  return (
    <div className="w-[25%]  bg-white border-r py-4 px-3 flex flex-col gap-6">
      <Output />
      <Languages />
      <TabsComp templateName={templateName} />
    </div>
  );
}

export default Slidebar;
