"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import tinycolor from "tinycolor2";
import { useMyContext } from "@/lib/Context";
interface ColorSelectorProps {
  defaultColor?: string;
  colorFor: string;
}
const ColorSelector: React.FC<ColorSelectorProps> = ({
  defaultColor,
  colorFor,
}) => {
  const { setBgColor, setPrimaryColor, setBg, primaryColor, bgColor } =
    useMyContext();

  const selectorRef = useRef<HTMLInputElement>(null);

  const onColorSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBg("");
    if (colorFor === "BgColor") {
      setBgColor(value);
    } else if (colorFor === "PrimaryColor") {
      setPrimaryColor(value);
    }
  };
  useEffect(() => {
    let parsed = "#fff";
    if (colorFor === "BgColor") {
      setBgColor(bgColor);
      parsed = tinycolor(bgColor).toHexString();
    } else if (colorFor === "PrimaryColor") {
      setPrimaryColor(primaryColor);
      parsed = tinycolor(primaryColor).toHexString();
    }
    if (selectorRef?.current?.value !== undefined) {
      selectorRef.current.value = parsed;
    }
  }, [colorFor, bgColor, primaryColor]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBg("");
    const value = event.target.value;
    if (colorFor === "BgColor") {
      setBgColor(value);
    } else if (colorFor === "PrimaryColor") {
      setPrimaryColor(value);
    }
    const parsed = tinycolor(value).toHexString();
    if (selectorRef?.current?.value !== undefined)
      selectorRef.current.value = parsed;
  };

  return (
    <div className="w-full  relative ">
      <Input
        type="text"
        onChange={handleInput}
        value={colorFor === "BgColor" ? bgColor : primaryColor}
        defaultValue={colorFor === "BgColor" ? bgColor : primaryColor}
        className="w-full"
      />
      <Input
        type="color"
        defaultValue={colorFor === "BgColor" ? bgColor : primaryColor}
        ref={selectorRef}
        onChange={onColorSelect}
        className="absolute p-0 border-none outline-none  right-0 top-0 m-1 w-9 h-8"
      />
    </div>
  );
};

export default ColorSelector;
