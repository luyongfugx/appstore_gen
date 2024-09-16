/* eslint-disable @next/next/no-img-element */
"use client";

import { useMyContext } from "@/lib/Context";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserHandleCard from "./UserHandleCard";
import bannerImg from "../../../public/banner.png";
import iosImg from "../../../public/ios.jpg";
function TemplateOne() {
  const {
    templateDatas,
    slideData,
    setSlideData,
    setCrouLength,
    bgColor,
    setBgColor,
    primaryColor,
    setPrimaryColor,
    SetCrousalValues,
    myImg,
    bg,
    count,
    setHaveImg,
    banner,
    lang,
    outPutSize,
    setShowForm,
  } = useMyContext();

  const scale = 5;
  const onCrousalLoad = () => {
    const tempD = templateDatas["TemplateOne"];
    setCrouLength(tempD.screenData![lang].length);
    setBgColor(tempD.defaultBg);
    setPrimaryColor(tempD.primaryColor);
  };

  // OPENING USE-EFFECT
  useEffect(() => {
    setHaveImg(false);
    onCrousalLoad();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateDatas]);

  // CUSTOM INDX
  let indxCount = 0;
  const tempData = templateDatas["TemplateOne"];

  return (
    <>
      {tempData.screenData![lang].map((val, indx) => {
        indxCount = indxCount + 1;
        return (
          <div
            key={indx}
            id={`slide${indxCount}`}
            className="rounded-sm overflow-hidden"
            style={
              bg.length > 1
                ? {
                    backgroundImage: "url(" + bg + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: outPutSize.width / scale,
                    height: outPutSize.height / scale,
                  }
                : {
                    backgroundColor: bgColor,
                    width: outPutSize.width / scale,
                    height: outPutSize.height / scale,
                  }
            }
          >
            <div
              className={`p-2 h-full w-full  relative   rounded-sm flex flex-col items-center justify-center `}
              style={{ borderColor: primaryColor }}
            >
              <div
                className="h-full w-full flex justify-start flex-col"
                style={{ color: primaryColor }}
              >
                <span
                  id={`title${indxCount}  `}
                  className={
                    val?.title !== null
                      ? " text-3xl text-center font-bold w-full whitespace-pre-wrap"
                      : "hidden"
                  }
                  style={{ color: primaryColor }}
                >
                  {val?.title}
                </span>

                <span
                  id={`subtitle${indxCount}`}
                  className={
                    val.subtitle !== null
                      ? "text-lg text-start font-medium w-full whitespace-pre-wrap mb-2"
                      : "hidden"
                  }
                  style={{ color: primaryColor }}
                >
                  {val.subtitle}
                </span>

                <div
                  id={`image${indxCount}`}
                  className={
                    val?.banner
                      ? "relative flex w-full justify-center items-center"
                      : "hidden"
                  }
                >
                  <img
                    src={iosImg.src}
                    alt="banners"
                    height={"auto"}
                    width={"85%"}
                    id={`slideImg${indxCount}`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TemplateOne;
