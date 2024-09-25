/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMyContext } from "@/lib/Context";
import { Button } from "../ui/Button";
import { title } from "process";
import Image from "next/image";
import ImageCrop from "./ImageCrop";
import bannerImg from "../../../public/banner.png";
function EditorForm({ templateName }) {
  const { count, lang, templateDatas, setTemplateDatas } = useMyContext();
  const tempData = templateDatas[templateName];
  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    indx: number
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    const item = tempData.screenData![lang][count > 1 ? count - 1 : 0];
    item[indx].value = value;
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };
  const items = templateDatas[templateName]
    ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
    : [];
  return (
    <>
      {items.map((item, indx) => {
        return item.type === "text" ? (
          <div
            className="grid w-full max-w-sm items-center gap-1.5"
            key={item.name}
          >
            <Label htmlFor={item.name}>{item.name}</Label>
            <Input
              type="text"
              name={item.name}
              id={item.name}
              placeholder={item.name}
              value={item.value}
              onChange={(value) => {
                handleInput(value, indx);
              }}
            />
          </div>
        ) : (
          <div className=" flex-col  justify-around w-full ">
            <div className="bg-gray-400 max-h-52 aspect-video relative flex justify-center w-full">
              <img src={item.value} alt="banner" className="" />
            </div>
            <div className="flex justify-center w-full mt-4">
              <ImageCrop
                setFor="banner"
                indx={indx}
                templateName={templateName}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default EditorForm;
