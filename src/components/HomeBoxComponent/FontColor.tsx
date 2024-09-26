"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import tinycolor from "tinycolor2";
import { useMyContext } from "@/lib/Context";
interface ColorSelectorProps {
  templateName: string;
}
const FontColorSelector: React.FC<ColorSelectorProps> = ({ templateName }) => {
  const { count, lang, templateDatas, setTemplateDatas, moveableId } =
    useMyContext();

  const [item, setItem] = useState<any>();
  const [ix, setIx] = useState<number>(0);
  const tempData = templateDatas[templateName];

  useEffect(() => {
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];
    items.forEach((im, indx) => {
      const mId = im.name + "_" + count + "_" + indx;
      if (mId === moveableId) {
        setItem(im);
        setIx(indx);
        let parsed = "#fff";
        parsed = tinycolor(im.font!.color).toHexString();
        if (selectorRef?.current?.value !== undefined) {
          selectorRef.current.value = parsed;
        }
      }
    });
  }, [moveableId, item, ix, count, templateDatas, lang, templateName]);

  const selectorRef = useRef<HTMLInputElement>(null);
  const customColor = [
    { colorCode: "#f87171" },
    { colorCode: "#facc15" },
    { colorCode: "#60a5fa" },
    { colorCode: "#48dc80" },
    { colorCode: "#c084fc" },
    { colorCode: "#f472b6" },
  ];
  const onColorSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    let parsed = "#fff";
    parsed = tinycolor(value).toHexString();
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];

    items.forEach((im, indx) => {
      const mId = im.name + "_" + count + "_" + indx;
      if (mId === moveableId) {
        im.font!.color = value;
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  };

  const handleColorBox = (code: string) => {
    const value = code;
    let parsed = "#fff";

    // tempData.bgColor = value;
    parsed = tinycolor(value).toHexString();
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];

    items.forEach((im, indx) => {
      const mId = im.name + "_" + count + "_" + indx;
      if (mId === moveableId) {
        im.font!.color = value;
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  };
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let parsed = "#fff";
    parsed = tinycolor(value).toHexString();
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];

    items.forEach((im, indx) => {
      const mId = im.name + "_" + count + "_" + indx;
      if (mId === moveableId) {
        im.font!.color = value;
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between py-3">
        {customColor.map((itm, indx) => {
          return (
            <div
              className={`h-8 w-8  rounded-md cursor-pointer hover:border`}
              style={{ backgroundColor: itm.colorCode }}
              key={indx}
              onClick={() => handleColorBox(itm.colorCode)}
            ></div>
          );
        })}
      </div>
      {item ? (
        <div className="w-full  relative ">
          <Input
            type="text"
            onChange={handleInput}
            defaultValue={item.font.color}
            className="w-full"
          />
          <Input
            type="color"
            defaultValue={item.font.color}
            ref={selectorRef}
            onChange={onColorSelect}
            className="absolute p-0 border-none outline-none  right-0 top-0 m-1 w-9 h-8"
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default FontColorSelector;
