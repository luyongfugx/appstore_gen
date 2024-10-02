import React from "react";

import Languages from "../Nav/Languages";
import TabsComp from "./TabsComp";
import Output from "../Nav/Output";
function Slidebar({ templateName }) {
  return (
    <div className="z-50 min-w-[120px] bg-background md:min-w-[240px] overflow-hidden  flex-[16_1_0px] h-full py-5">
      <div>
        <TabsComp templateName={templateName} />
      </div>
    </div>
  );
}

export default Slidebar;
