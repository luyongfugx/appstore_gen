/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TemplateData, useMyContext } from "@/lib/Context";
import { Button } from "../ui/Button";
import { title } from "process";
import Image from "next/image";
import ImageCrop from "./ImageCrop";
import bannerImg from "../../../public/banner.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";
import FontEditorToolbar from "./FontEditor";
import FontColorSelector from "./FontColor";
function EditorForm({ templateName }) {
  const {
    count,
    selectedLanguage,
    templateDatas,
    setTemplateDatas,
    moveableId,
  } = useMyContext();

  const [item, setItem] = useState<any>();
  const [ix, setIx] = useState<number>(0);
  const [tempData, setTempData] = useState<TemplateData>();
  useEffect(() => {
    const tempData = templateDatas[templateName];
    setTempData(tempData);
    const items = templateDatas[templateName]
      ? tempData.screenData![selectedLanguage][count > 1 ? count - 1 : 0]
      : [];
    items.forEach((im, indx) => {
      const mId = count + "_" + indx;
      if (mId === moveableId) {
        setItem(im);
        setIx(indx);
      }
    });
  }, [
    moveableId,
    item,
    ix,
    count,
    templateDatas,
    selectedLanguage,
    templateName,
  ]);
  return (
    <>
      {item && item.type === "text" ? (
        // <Card className="w-[300px] p-4">
        <Tabs defaultValue="font" className="w-[90%]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="font">font</TabsTrigger>
            <TabsTrigger value="color">color</TabsTrigger>
          </TabsList>
          <TabsContent value="font">
            <FontEditorToolbar templateName={templateName} />
          </TabsContent>
          <TabsContent value="color">
            <div className="space-y-1">
              <FontColorSelector key={"BgColor"} templateName={templateName} />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        // </Card>
        item && (
          <div className=" flex-col  justify-around w-[90%] ">
            <div className="bg-gray-400 max-h-52 aspect-video relative flex justify-center w-full">
              <img src={item.value} alt="banner" className="" />
            </div>
            <div className="flex justify-center w-full mt-4">
              <ImageCrop
                setFor="banner"
                indx={ix}
                templateName={templateName}
              />
            </div>
          </div>
        )
      )}
    </>
  );
}

export default EditorForm;
