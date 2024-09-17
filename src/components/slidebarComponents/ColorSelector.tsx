"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import tinycolor from "tinycolor2";
import { useMyContext } from "@/lib/Context";
interface ColorSelectorProps {
  defaultColor?: string;
  colorFor: string;
  templateName: string;
}
const ColorSelector: React.FC<ColorSelectorProps> = ({
  defaultColor,
  colorFor,
  templateName,
}) => {
  const { templateDatas, setTemplateDatas } = useMyContext();

  const tempData = templateDatas[templateName];

  const selectorRef = useRef<HTMLInputElement>(null);

  const onColorSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let parsed = "#fff";
    if (colorFor === "BgColor") {
      tempData.bgColor = value;
      parsed = tinycolor(tempData.bgColor).toHexString();
    } else if (colorFor === "PrimaryColor") {
      tempData.primaryColor = value;
      parsed = tinycolor(tempData.primaryColor).toHexString();
      // setPrimaryColor(value);
    }
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  };
  useEffect(() => {
    let parsed = "#fff";
    if (colorFor === "BgColor") {
      parsed = tinycolor(tempData.bgColor).toHexString();
    } else if (colorFor === "PrimaryColor") {
      parsed = tinycolor(tempData.primaryColor).toHexString();
    }
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  }, [colorFor]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setBg("");
    const value = event.target.value;
    let parsed = "#fff";
    if (colorFor === "BgColor") {
      tempData.bgColor = value;
      parsed = tinycolor(tempData.bgColor).toHexString();
    } else if (colorFor === "PrimaryColor") {
      tempData.primaryColor = value;
      parsed = tinycolor(tempData.primaryColor).toHexString();
      // setPrimaryColor(value);
    }
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  };

  return (
    <div className="w-full  relative ">
      <Input
        type="text"
        onChange={handleInput}
        value={
          colorFor === "BgColor" ? tempData.bgColor : tempData.primaryColor
        }
        className="w-full"
      />
      <Input
        type="color"
        defaultValue={
          colorFor === "BgColor" ? tempData.bgColor : tempData.primaryColor
        }
        ref={selectorRef}
        onChange={onColorSelect}
        className="absolute p-0 border-none outline-none  right-0 top-0 m-1 w-9 h-8"
      />
    </div>
  );
};

export default ColorSelector;
