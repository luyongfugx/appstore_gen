"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMyContext } from "@/lib/Context";
import ImageCrop from "../HomeBoxComponent/ImageCrop";
import ColorSelector from "./ColorSelector";
import tinycolor from "tinycolor2";

function TabsComp({ templateName }) {
  const { count, crouLength, lang, templateDatas, setTemplateDatas } =
    useMyContext();

  const tempData = templateDatas[templateName];
  const [key, setKey] = useState(1);
  const customColor = [
    { colorCode: "#f87171" },
    { colorCode: "#facc15" },
    { colorCode: "#60a5fa" },
    { colorCode: "#48dc80" },
    { colorCode: "#c084fc" },
    { colorCode: "#f472b6" },
  ];

  const handleColorBox = (code: string) => {
    const value = code;
    let parsed = "#fff";

    tempData.bgColor = value;
    parsed = tinycolor(tempData.bgColor).toHexString();

    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
    // setBg("");
    // setBgColor(code);
  };
  return (
    <>
      <div className="w-full max-w-sm items-center gap-1.5 justify-start ">
        <h1 className="w-full text-center">background</h1>
        <div className="w-full flex justify-center mt-2">
          <Tabs defaultValue="color" className="w-[90%]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
            </TabsList>
            <TabsContent value="color">
              <Card>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex flex-row justify-between py-3">
                      {customColor.map((itm, indx) => {
                        return (
                          <div
                            className={`h-8 w-8  rounded-md cursor-pointer hover:border`}
                            style={{ backgroundColor: itm.colorCode }}
                            key={indx}
                            onClick={() => handleColorBox(itm.colorCode)}
                          >
                            {" "}
                          </div>
                        );
                      })}
                    </div>

                    <ColorSelector
                      key={"BgColor"}
                      colorFor="BgColor"
                      templateName={templateName}
                      defaultColor={tempData.bgColor}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="image">
              <Card>
                <CardContent className="space-y-2 ">
                  <Label className="text-xs">Image</Label>
                  <div className="space-y-1">
                    <ImageCrop
                      setFor="background"
                      templateName={templateName}
                    />
                  </div>
                  <div className="space-y-1"></div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default TabsComp;
